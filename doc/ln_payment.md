# Mainstay LN payments

Config will include c-lightning REST endpoint and macaroon (auth token). 

A new database table: `Tokens` will be created to keep track of issued tokens and their payment status. 

The `ClientDetails` table will have a new column for `expiry_date` (after this date, the `/commitment/send` route will no longer work). 

## Paying for for access tokens via LN

`GET /token/init/{value}`

Response:

```
{
  "lightning_invoice": {
    "bolt11": "string",
    "expires_at": 0,
    "payment_hash": "string"
  },
  "token_id": "string",
  "value": 0
}
```

This function will generate random `token_id` and call `v1/invoice/genInvoice` with label `token_id` on c-lightning REST to generate `lightning_invoice`. 

## Verify confirmed and spent status of pod token

`GET /token/verify/{token_id}`

Response:

```
{
  "amount": 0,
  "confirmed": true
}
```

This function will call `v1/invoice/listInvoices?label=token_id` and check the if the invoice has been paid. If it has, the `Tokens` table will be updated with the value. 

## Use token to pay for an access slot

`POST /spendtoken`

Body parameter

```
{
  "token_id": "string",
  "slot_id": 0
}
```
This function will check the `Tokens` table to check the value of the `token_id`. If sufficient, will then either update slot user data or create a new slot. 

If `slot_id` is 0, then this function will create a new row in `ClientDetails` with the next available slot ID (`client_position`) and an `expiry_date` set an amount of time in the future set by the `value` and the `fee_rate`

If `slot_id` is an existing slot, the row in `ClientDetails` will be updated with a new `expiry_date` (time added dependent on the `value` and the `fee_rate`). 

## Check expiry date

`GET /slotexpiry/{slot_id}`

This will return the `expiry_date` for the specified `slot_id`. 
