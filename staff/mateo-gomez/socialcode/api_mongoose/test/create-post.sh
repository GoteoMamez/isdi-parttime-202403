curl -X POST http://localhost:8080/posts -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjhhODkyMzI3YjM5ZDdiMTliNGUyNTQiLCJpYXQiOjE3MjAzNjYzNzgsImV4cCI6MTcyMDM2OTk3OH0.gBFBG3XpBNvTZk_mXnecWqmVHiNzo8OYf2KCc8nkHHI" -H "Content-Type: application/json" -d '{"title":"blah","image":"https://upload.wikimedia.org/wikipedia/commons/1/1d/Blah_Blah_Blah.jpg","description":"blah blah"}' -v