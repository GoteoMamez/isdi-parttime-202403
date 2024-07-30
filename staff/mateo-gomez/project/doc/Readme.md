# Connecttoo

![alt text](image.png)

## Description

This app connects tattoo artists from all locations, promoting the creation of professional contacts while facilitating the reception of artists in destinations. It is based on the idea that artists welcome artists in their professional and personal environment so that both achieve a positive experience during their stay.


## Functional

### Use cases

Host
- Edit profile
- Create Host Post for the Host Board
- Delete Post
- List Post
- Reply message

Guest
- Edit profile
- Create Guest Posts for the Guest Board
- Search Guest by location
- Send message to Host


#### Version 0.1

- Add location?


### UI Design
[Figma](https://www.figma.com/design/bnVvR6CuHIAEc8vvtGzetr/Dise%C3%B1o-proyecto-final?node-id=0-1&t=i97vTcMza5BVt5wm-0)

## Technical

### Blocks

- App
- API
- DB

### Modules

- App
- API
- com
- doc


### Data Model

User
 
- id (auto)
- name (string, required)
- surname (string, required)
- username (string, required, unique)
- email (string, required, unique)
- password (string, required, hashed)


Post Host

- id (auto)
- author (User.id)
- image (string)
- description (string)
- location/city (string)
- Age (string)
- Offer (string)

Post Guest

- id (auto)
- author (User.id)
- image (string)
- description (string)
- Date (date)
- From-To (string-string)

Host PostList

- Posts from host


Guest PostList

- Post from guest