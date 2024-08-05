# Connecttoo

![alt text](image.png)

## Description

This app connects tattoo artists from all locations, promoting the creation of professional contacts while facilitating the reception of artists in destinations. It is based on the idea that artists welcome artists in their professional and personal environment so that both achieve a positive experience during their stay.


## Functional

### Use cases

User
- Edit profile
- Add photo
- Add SocialMedia Link
- View chats
- Send message in chat
- Choose location
- View profile
- View PostList
- Delete Post
- View post



Host
- Create Host Post for the Host Board

Guest
- Create Guest Posts for the Guest Board
- Search Host by location


#### Version 0.1
Host/Guest

- Add location with geo
- API of ubications


### UI Design
[Figma](https://www.figma.com/design/bnVvR6CuHIAEc8vvtGzetr/Dise%C3%B1o-proyecto-final?node-id=0-1&t=i97vTcMza5BVt5wm-0)

## Technical

### Blocks

- App
- API
- DB

### Modules

- app
- api
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


HostPost

- id (auto)
- author (User.id)
- image (string)
- description (string)
- location/city (string)
- age (string)
- offer (string)

 GuestPost

- id (auto)
- author (User.id)
- image (string)
- description (string)
- date (date)
- fromLocation (string)
- toLocation (string)



Chat 
- id(auto)
- users([User.id])
- messages([Message])


Message
- id (auto)
- sender(User.id)
- text (string)
- date (Date)