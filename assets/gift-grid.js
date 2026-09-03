/**
 * Gift grid - quick-add popup
 * ---------------------------------------------------------------------------
 * Drives the popup of `sections/gift-grid.liquid`. Vanilla JavaScript only.
 *
 * How it works
 *  - Every tile prints its product as a small JSON payload (see
 *    `snippets/gift-product-data.liquid`), so opening the popup needs no
 *    network request and no product data is duplicated in this file.
 *  - The popup is a native <dialog>: Escape, the backdrop and focus handling
 *    are provided by the browser.
 *  - Option inputs are built from the product's own options: the first option
 *    is rendered as a row of buttons, every following option as a dropdown.
 *  - "Add to cart" posts to /cart/add.js. When the selected variant matches
 *    the section's bundle trigger (by default "Black" + "Medium"), the bundled
 *    product is added in the same request.
 *
 * All user facing copy comes from the section settings through data attributes,
 * so nothing needs translating in here.
 */

/** Shop root path ("/" or "/fr" for example), used to build the cart URLs. */
const shopRoot = () => window.Shopify?.routes?.root ?? '/';

/** Case/whitespace insensitive compare helper for option values. */
const normalize = (value) => String(value).trim().toLowerCase();

class GiftGridPopup {
  /** @type {object|null} Product payload currently shown in the popup. */
  #product = null;

  /** @type {Array<string>} Selected value per product option, by index ("" = none). */
  #selection = [];

  /**
   * @param {HTMLElement} section - The section root element.
   * @param {HTMLDialogElement} dialog - The popup element inside that section.
   */
  constructor(section, dialog) {
    this.section = section;
    this.dialog = dialog;

    // Cache the popup parts once instead of querying on every interaction.
    this.refs = {
      image: dialog.querySelector('[data-gift-image]'),
      title: dialog.querySelector('[data-gift-title]'),
      price: dialog.querySelector('[data-gift-price]'),
      description: dialog.querySelector('[data-gift-description]'),
      options: dialog.querySelector('[data-gift-options]'),
      status: dialog.querySelector('[data-gift-status]'),
      submit: dialog.querySelector('[data-gift-add]'),
      submitLabel: dialog.querySelector('[data-gift-add-label]'),
    };

    // Copy + bundle configuration, all set by the section settings.
    this.text = { ...dialog.dataset };
    this.bundle = {
      variantId: Number(dialog.dataset.bundleVariant) || 0,
      productId: Number(dialog.dataset.bundleProduct) || 0,
      triggers: (dialog.dataset.bundleOptions || '')
        .split(',')
        .map(normalize)
        .filter(Boolean),
    };

    // One delegated listener per event type covers the tiles and the popup.
    section.addEventListener('click', this.#onClick);
    section.addEventListener('change', this.#onChange);
  }

  /* ----------------------------------------------------------------- events */

  #onClick = (event) => {
    const target = /** @type {HTMLElement} */ (event.target);

    const opener = target.closest('[data-gift-open]');
    if (opener) return this.#open(opener);

    if (target.closest('[data-gift-close]')) return this.#close();

    const value = target.closest('[data-gift-value]');
    if (value) return this.#select(Number(value.dataset.optionIndex), value.dataset.giftValue);

    if (target.closest('[data-gift-add]')) return this.#addToCart();

    // Clicks on the ::backdrop are reported on the dialog itself, so compare
    // the pointer position with the dialog box to tell them apart.
    if (target === this.dialog && !this.#isInsideDialog(event)) this.#close();
  };

  #onChange = (event) => {
    const select = /** @type {HTMLSelectElement} */ (event.target).closest('[data-gift-select]');
    if (select) this.#select(Number(select.dataset.optionIndex), select.value);
  };

  /** @param {MouseEvent} event */
  #isInsideDialog({ clientX, clientY }) {
    const box = this.dialog.getBoundingClientRect();
    return clientX >= box.left && clientX <= box.right && clientY >= box.top && clientY <= box.bottom;
  }

  /* ------------------------------------------------------------ open/close */

  /** @param {HTMLElement} opener - The "+" button that was clicked. */
  #open(opener) {
    const payload = opener.closest('[data-gift-item]')?.querySelector('[data-gift-product]');
    if (!payload) return;

    try {
      this.#product = JSON.parse(payload.textContent);
    } catch {
      return; // Malformed payload: nothing to show.
    }

    // Preselect the values of the first available variant for the button
    // option, and leave the dropdowns empty (as in the design).
    const firstAvailable = this.#product.variants.find((variant) => variant.available);
    this.#selection = this.#product.options.map((option, index) =>
      index === 0 && firstAvailable ? firstAvailable.options[index] : ''
    );

    this.#render();
    this.dialog.showModal();
  }

  #close() {
    this.dialog.close();
    this.#product = null;
  }

  /* --------------------------------------------------------------- rendering */

  #render() {
    const product = this.#product;

    this.refs.title.textContent = product.title;
    this.refs.description.textContent = product.description;
    this.refs.image.alt = product.title;
    this.#setImage(product.image);

    this.refs.options.replaceChildren(
      ...product.options.map((option, index) => this.#buildOption(option, index))
    );

    this.#sync();
  }

  /**
   * Builds one option group: buttons for the first option, a dropdown for the
   * rest - which is what the design shows ("Color" as buttons, "Size" as a
   * dropdown) and works for any number of options.
   *
   * @param {{name: string, values: string[]}} option
   * @param {number} index - Position of the option, matching `variant.options`.
   * @returns {HTMLElement}
   */
  #buildOption(option, index) {
    const group = document.createElement('div');
    const id = `gift-option-${this.#product.id}-${index}`;
    const asButtons = index === 0;

    // The button group is labelled through aria-labelledby, the dropdown
    // through a real <label for>.
    const label = document.createElement(asButtons ? 'span' : 'label');
    label.className = 'gift-popup__option-label';
    label.textContent = option.name;
    label.id = `${id}-label`;
    if (!asButtons) label.setAttribute('for', id);
    group.append(label);

    group.append(asButtons ? this.#buildValueButtons(option, index, id) : this.#buildSelect(option, index, id));

    return group;
  }

  #buildValueButtons(option, index, id) {
    const list = document.createElement('div');
    list.className = 'gift-popup__values';
    list.setAttribute('role', 'group');
    list.setAttribute('aria-labelledby', `${id}-label`);
    // Colour options get a colour chip, as in the design.
    const isColor = /colou?r/i.test(option.name);

    for (const value of option.values) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'gift-popup__value';
      button.textContent = value;
      button.dataset.giftValue = value;
      button.dataset.optionIndex = String(index);
      button.setAttribute('aria-pressed', String(normalize(this.#selection[index]) === normalize(value)));

      if (isColor) {
        button.dataset.swatch = '';
        // CSS named colours cover the palette used by the store's option
        // names; unknown names simply render no chip.
        button.style.setProperty('--gift-swatch', value.replace(/\s+/g, '').toLowerCase());
      }

      // A value with no available variant at all is struck through.
      const sellable = this.#product.variants.some(
        (variant) => variant.available && normalize(variant.options[index]) === normalize(value)
      );
      if (!sellable) button.dataset.unavailable = 'true';

      list.append(button);
    }

    return list;
  }

  #buildSelect(option, index, id) {
    const wrapper = document.createElement('div');
    wrapper.className = 'gift-popup__select-wrapper';

    const select = document.createElement('select');
    select.className = 'gift-popup__select';
    select.id = id;
    select.dataset.giftSelect = '';
    select.dataset.optionIndex = String(index);

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = (this.text.textPlaceholder || 'Choose your [option]').replace(
      '[option]',
      option.name.toLowerCase()
    );
    select.append(placeholder);

    for (const value of option.values) {
      const item = document.createElement('option');
      item.value = value;
      item.textContent = value;
      item.selected = normalize(this.#selection[index]) === normalize(value);
      select.append(item);
    }

    // Caret drawn by CSS on the right hand side of the field.
    const caret = document.createElement('span');
    caret.className = 'gift-popup__select-caret';
    caret.innerHTML = '<svg width="14" height="8" viewBox="0 0 14 8" aria-hidden="true"><path d="M1 1l6 6 6-6" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>';

    wrapper.append(select, caret);
    return wrapper;
  }

  /* --------------------------------------------------------------- selection */

  /**
   * @param {number} index - Option position.
   * @param {string} value - Selected value ("" when the placeholder is chosen).
   */
  #select(index, value) {
    if (!this.#product || Number.isNaN(index)) return;

    this.#selection[index] = value;

    // Only the button group needs its pressed state refreshed; dropdowns keep
    // their own state.
    this.refs.options
      .querySelectorAll(`[data-gift-value][data-option-index="${index}"]`)
      .forEach((button) => {
        button.setAttribute('aria-pressed', String(normalize(button.dataset.giftValue) === normalize(value)));
      });

    this.#sync();
  }

  /** @returns {object|null} The variant matching the current selection. */
  #currentVariant() {
    if (this.#selection.some((value) => !value)) return null; // incomplete selection

    return (
      this.#product.variants.find((variant) =>
        this.#selection.every((value, index) => normalize(variant.options[index]) === normalize(value))
      ) || null
    );
  }

  /** Reflects the current selection in the price, image and submit button. */
  #sync() {
    const variant = this.#currentVariant();

    this.refs.price.textContent = variant ? variant.price : this.#product.price;
    if (variant?.image) this.#setImage(variant.image);

    const soldOut = Boolean(variant) && !variant.available;
    this.refs.submit.disabled = soldOut;
    this.refs.submitLabel.textContent = soldOut
      ? this.text.textSoldOut || 'Sold out'
      : this.text.textAddToCart || 'Add to cart';
    this.#setStatus('');
  }

  /** @param {string|null} url - Image URL, or null to hide the image. */
  #setImage(url) {
    const image = this.refs.image;
    image.hidden = !url;
    if (url) image.src = url;
    else image.removeAttribute('src');
  }

  #setStatus(message) {
    this.refs.status.textContent = message;
  }

  /* ------------------------------------------------------------ add to cart */

  async #addToCart() {
    const variant = this.#currentVariant();

    if (!variant) return this.#setStatus(this.text.textSelectOptions || 'Please select all options.');
    if (!variant.available) return this.#setStatus(this.text.textSoldOut || 'Sold out');

    const items = [{ id: variant.id, quantity: 1 }];
    if (this.#matchesBundle(variant)) items.push({ id: this.bundle.variantId, quantity: 1 });

    this.refs.submit.disabled = true;
    this.#setStatus('');

    try {
      const response = await fetch(`${shopRoot()}cart/add.js`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) throw new Error(`Cart error ${response.status}`);

      this.#setStatus(this.text.textAdded || 'Added to cart');
      notifyThemeCartUpdated(items);
    } catch (error) {
      console.error('[gift-grid] add to cart failed', error);
      this.#setStatus(this.text.textError || 'Something went wrong. Please try again.');
    } finally {
      this.refs.submit.disabled = false;
    }
  }

  /**
   * The bundled product is added when the selected variant carries every
   * trigger option value (by default "Black" and "Medium").
   *
   * @param {object} variant
   * @returns {boolean}
   */
  #matchesBundle(variant) {
    const { variantId, productId, triggers } = this.bundle;

    if (!variantId || triggers.length === 0) return false;
    if (this.#product.id === productId) return false; // already the bundled product

    const selected = variant.options.map(normalize);
    return triggers.every((trigger) => selected.includes(trigger));
  }
}

/**
 * Tells the theme that the cart changed so the cart icon and cart drawer
 * refresh. The theme's event bundle is imported lazily and every step that
 * could fail happens before the event is dispatched, so a theme without it
 * never breaks the add to cart itself.
 *
 * @param {Array<{id: number, quantity: number}>} items - Items just added.
 */
async function notifyThemeCartUpdated(items) {
  try {
    const { CartLinesUpdateEvent } = await import('@shopify/events');
    if (typeof CartLinesUpdateEvent?.createCartFromAjaxResponse !== 'function') return;

    const state = await fetch(`${shopRoot()}cart.js`).then((response) => response.json());
    const cart = CartLinesUpdateEvent.createCartFromAjaxResponse(state);
    const deferred = CartLinesUpdateEvent.createPromise();

    document.dispatchEvent(
      new CartLinesUpdateEvent({
        action: 'add',
        context: 'product',
        lines: items.map((item) => ({ merchandiseId: String(item.id), quantity: item.quantity })),
        promise: deferred.promise,
      })
    );

    deferred.resolve({
      cart,
      detail: {
        items: state.items,
        source: 'gift-grid',
        itemCount: items.reduce((total, item) => total + item.quantity, 0),
      },
    });
  } catch {
    // The theme does not expose cart events - the popup message is enough.
  }
}

/** Boots one section, guarding against double initialisation. */
function init(section) {
  const dialog = section.querySelector('[data-gift-popup]');
  if (!dialog || section.dataset.giftReady === 'true') return;

  section.dataset.giftReady = 'true';
  new GiftGridPopup(section, dialog);
}

document.querySelectorAll('[data-gift-grid]').forEach(init);

// Sections are re-rendered while editing in the theme customizer.
document.addEventListener('shopify:section:load', (event) => {
  event.target.querySelectorAll('[data-gift-grid]').forEach(init);
});
