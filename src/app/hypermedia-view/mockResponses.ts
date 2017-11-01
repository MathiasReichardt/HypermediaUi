export class MockResponses {

public static customerWithParameterlessAction = JSON.parse(
`
{
  "class": [
     "Customer"
  ],
  "title": "A Customer",
  "properties": {
     "FullName": "Grace Miranda",
     "Age": 84,
     "Address": "6th Avenue 489 Busan",
     "IsFavorite": false
  },
  "entities": [],
  "actions": [
     {
        "name": "CustomerMove",
        "title": "A Customer moved to a new location.",
        "method": "POST",
        "href": "http://localhost:5000/Customers/1/Moves",
        "type": "application/json",
        "fields": [
           {
              "name": "NewAddress",
              "type": "application/json",
              "class": [
                 "http://localhost:5000/Customers/NewAddressType"
              ]
           }
        ]
     },
     {
        "name": "MarkAsFavoriteAction",
        "title": "Marks a Customer as a favorite buyer.",
        "method": "POST",
        "href": "http://localhost:5000/Customers/MyFavoriteCustomers",
        "type": "application/json"
     }
  ],
  "links": [
     {
        "rel": [
           "Self"
        ],
        "href": "http://localhost:5000/Customers/1"
     }
  ]
}`);
}
