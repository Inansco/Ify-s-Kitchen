# TastyBite Kitchen — restaurant website demo

Static responsive restaurant website with menu, cart and WhatsApp checkout.

## Run locally

```bash
python3 -m http.server 8000
```

Visit http://localhost:8000.

## Before using for a real customer

- Set `RESTAURANT_WHATSAPP` in `js/script.js` to the restaurant's verified number in international format without `+`.
- Replace demonstration restaurant name, menu, prices, descriptions, opening hours and contact details.
- Use food photographs with permission or appropriate commercial-use licenses. Uploaded sample photographs may have third-party copyrights or watermarks.
- Test on mobile and desktop, including a real WhatsApp order.
- Checkout sends a WhatsApp message; it does not charge money or create a server-side order.
