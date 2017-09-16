#!/bin/bash
# for a new product, we can also hard code a new product in this header
API="http://localhost:4741"
URL_PATH="/products"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "product": {
      "product_name": "'"${PRODUCT_NAME}"'",
      "sku_number": "'"${SKU_NUMBER}"'",
      "department": "'"${DEPARTMENT}"'",
      "quantity_number": "'"${QUANTITY_NUMBER}"'",
      "quantity_unit": "'"${QUANTITY_UNIT}"'"
    }
  }'

echo
