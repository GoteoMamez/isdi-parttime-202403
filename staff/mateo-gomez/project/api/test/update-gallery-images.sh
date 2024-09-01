curl -X PATCH http://localhost:9090/users/update/gallery-images \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNlZjM1OWE0NzkzOTM2ZjM3NGViNDkiLCJpYXQiOjE3MjUwMzIzODYsImV4cCI6MTcyNTA0Njc4Nn0.rppc5iOHXhYf8kCdEsArFa2fVR72oRDD3tpMvEJc3n4" \
-H "Content-Type: application/json" \
-d '{"newGalleryImages": ["https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/257953230/original/8006a3276d663b1fd0140c2591283ec8030f97cb/vintage-cartoon-flash-tattoo-retro-old-school-40s-cartoons.jpg"]}' \
-v
