# SEA SCAPE

## [See!](https://seascape.adaptable.app)

![Web Logo](./public/images/sea-scape-logo.gif)

## Description

Sea Scape is a web app where users explore and rate beaches. They can search by region or browse a comprehensive list. Administrators manage the database, editing, deleting, or adding beaches as needed. Administrators also see the comments of the users and have the rights to delete them.

## User stories
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **login-signup** - As a user I want to see a welcome page that gives me the option to either log in as an existing user, or sign up with a new account. 
- **add-signup** - As a user I want to sign up with my full information so that I can have access to the page.
- **homepage** - Users can see a carrousel of images on the home page.
- **beach-search** - Users can explore beaches by region or view a comprehensive list of available beaches.
- **beach-details** - Upon selecting a specific beach, users can view detailed information including reviews, ratings, and general descriptions. Additionally, they can access administrative controls to edit or delete their comments.
- **administrative-controls** - Administrators have exclusive rights to manage the beach database. They can edit or delete existing beach entries, create new ones, and moderate user comments to maintain a positive community environment.
<br>

## API routes (back-end)

- GET / 
  - renders login-signup.hbs
- GET /auth/signup
  - redirects to / if user logged in
  - renders add-signup.hbs
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - email
    - password
    - username
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - email
    - password
- GET /
  - renders homepage.hbs (the profile preview + search form)
- POST /homepage (search action)
  - body: 
    - game-title
    - console
- GET /game-search-results
  - renders game-search-results.hbs
  - includes the list of games
  - redirects to / if user presses button
- GET /rent-form/:id
  - renders rent-form.hbs
  - redirects to /game-search-results if user presses button
- POST /rent-form/:id
  - body: 
     - days
     - price update
- GET /success
  - renders success.hbs
  - redirects to / if user presses button
  
- GET /profile
  - renders user-profile.hbs
  - redirects to / if user presses button
- POST /profile (to edit profile)
  - redirects to /add-signup (we reuse it but for edit purposes)
  - body:
    - email
    - password
    - full name
    - birthday
    - gender
    - address
    - phone
    - cardInfo
    - typeOfCard
    - cardNumber
    - expDate
    - CVV
- POST /profile (to add game)
  - body:
    - game title
    - console
    - price
    - max days of rent
- GET /profile
  - renders user-profile.hbs updated
  - redirects to / if user presses button
- GET /notifications
  - renders notifications.hbs
  - redirects to / if user presses button
- GET /success (for renter)
  - renders success.hbs
  - redirects to /notifications if user presses button

<br>

## Models
 
 - User 
    new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
      profilePic: String,
  }
);
          
  - Beach
    new Schema({
    name: {
      type: String,
      require: true,
    },
    region: {
      type: String,
      require: true,
      enum: [
        "Andalucía",
        "Principado de Asturias",
        "Baleares",
        "Canarias",
        "Cantabria",
        "Cataluña",
        "Comunidad Valenciana",
        "Extremadura",
        "Galicia",
        "Comunidad de Madrid",
        "Región de Murcia",
        "País Vasco",
        "Ciudad Autónoma de Ceuta",
        "Ciudad Autónoma de Melilla",
      ],
    },
    description: {
      type: String,
      require: true,
    },
    location: {
      type: [Number],
      require: true,
    },
    difficultyAccess: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    entertainment: {
      type: [String],
      enum: ["Surf", "Nudism", "Diving", "Kayak", ""],
    },
    beachPic: String,
  }); 
  - Comment
    new Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  beach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beach",
  },
});
  - Rating
    new Schema({
  rating: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  beach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beach",
  },
});
    
    <br>
    
## Backlog

 - 
    
<br>

# Extra Links

### Sketch

[Link](https://excalidraw.com/#room=7a5a6f82b2f6f52d18bf,3uYNMui4c3tG9ABnmBKrSQ)

### Slides

[Link](https://docs.google.com/presentation/d/1DV2NBOsRPl-l1SD8mUNlPoukO9pK0_5_mHdi_haPn9o/edit?usp=sharing)

## Deploy

[Link](https://dsanchezva.github.io/the-simpsons-donut-run/)
