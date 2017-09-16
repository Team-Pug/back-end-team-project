
#!/bin/bash
# for a new product, we can also hard code updated info in this header
# we can adjust which fields we want to allow updating
API="http://localhost:4741"
URL_PATH="/products"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "product": {
      "quantity_number": "'"${QUANTITY_NUMBER}"'"
    }
  }'

echo
