curl -X PATCH http://localhost:9090/users/66cef359a4793936f374eb49/update -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNlZjM1OWE0NzkzOTM2ZjM3NGViNDkiLCJpYXQiOjE3MjQ4Mzg4MjYsImV4cCI6MTcyNDg1MzIyNn0.AhGxb6RWQUfoQYuoQhptEdgkS676XbjsJ_lgkQLzBH8" -H "Content-Type: application/json" -d '{ "galleryImages": [
    "https://estaticos-cdn.prensaiberica.es/clip/31537a05-e897-44f6-8664-f882233ad516_source-aspect-ratio_default_0.jpg",
    "https://cdn.legalsport.net/wp-content/uploads/2023/01/GettyImages-1447300079.jpg",
    "https://i.pinimg.com/originals/9b/00/0c/9b000cf4b81c28d16695e158f0468923.jpg",
    "https://i.imgur.com/JGsxaQ2.jpg"
  ]}' -v