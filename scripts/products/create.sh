#!/bin/bash

API="http://localhost:4741"
URL_PATH="/products"
NAME="Kohlrabi"
SKU=765234
DEPT="Produce"
NUM=2
UNIT="Boxes"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "product": {
      "product_name": "'"${NAME}"'",
      "sku_number": "'"${SKU}"'",
      "department": "'"${DEPT}"'",
      "quantity_number": "'"${NUM}"'",
      "quantity_unit": "'"${UNIT}"'"
    }
  }'

echo
