curl -X POST http://localhost:9090/users -H "Content-Type: application/json" -d '{
  "name": "lukita",
  "surname": "Doncic",
  "email": "luka77@doncic.com",
  "username": "lukita",
  "password": "123123123",
  "passwordRepeat": "123123123",
  "profileImage": "https://estaticos-cdn.prensaiberica.es/clip/83fd6f51-7e1d-46fc-a5f6-f4f834044e0f_16-9-discover-aspect-ratio_default_0.jpg",
  "description": "Soy Luka y me encantan los tatuajes, quiero conocer a nuevos profesionales y estoy encantado de acoger en mi humilde casa a quien lo necesite",
  "galleryImages": [
    "https://estaticos-cdn.prensaiberica.es/clip/31537a05-e897-44f6-8664-f882233ad516_source-aspect-ratio_default_0.jpg",
    "https://cdn.legalsport.net/wp-content/uploads/2023/01/GettyImages-1447300079.jpg",
    "https://i.pinimg.com/originals/9b/00/0c/9b000cf4b81c28d16695e158f0468923.jpg",
    "https://i.imgur.com/JGsxaQ2.jpg"
  ],
  "socialLinks": {
    "twitter": "https://x.com/luka7doncic",
    "instagram": "https://www.instagram.com/lukadoncic/",
    "facebook": "",
    "youtube": ""
  }
}' -v