# ⚡ Spark Quest

A gamified quest application that motivates children (ages 4-13) through RPG-style mechanics. Complete quests, earn Sparks, customize your avatar, and unlock rewards!

## 🎮 Features

- **Quest Spinner** - Generate age-appropriate quests across 4 categories
- **Chore Tracking** - Parents can assign custom tasks with XP rewards
- **Avatar System** - Customize characters with unlockable gear
- **Shop** - Spend Sparks on hats, shirts, glasses & more
- **Real Rewards** - Parents can add redeemable prizes
- **Multi-Player** - Support for multiple children per family
- **Level Progression** - XP-based leveling with milestone rewards

## 📁 Project Structure

```
spark-quest/
├── index.html              # Main HTML shell
├── styles/
│   └── main.css            # All styles
├── js/
│   ├── main.js             # Entry point
│   ├── config/
│   │   ├── firebase.js     # Firebase configuration
│   │   └── constants.js    # Game data & settings
│   ├── context/
│   │   └── GameContext.js  # State management
│   ├── components/
│   │   ├── App.js          # Main app component
│   │   ├── ErrorBoundary.js
│   │   ├── ui/             # Reusable UI components
│   │   └── screens/        # Page components
│   └── utils/
│       └── questGenerator.js
└── README.md
```

## 🚀 Deployment

### Option 1: GitHub + Vercel (Recommended)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/spark-quest.git
git branch -M main
git push -u origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Import your repository
   - Deploy!

### Option 2: Local Development

Simply open `index.html` in a browser. No build step required!

> ⚠️ Note: Firebase features require serving from a web server (not `file://`). Use a local server:
> ```bash
> npx serve .
> # or
> python -m http.server 8000
> ```

## 🔧 Configuration

### Firebase Setup

The app uses Firebase for authentication and data storage. To use your own Firebase project:

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Email/Password authentication
3. Create a Firestore database
4. Update `js/config/firebase.js` with your config

### Firestore Security Rules

Add these rules to your Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Parents can only access their own data
    match /parents/{email} {
      allow read, write: if request.auth != null && request.auth.token.email == email;
      
      match /kids/{kidId} {
        allow read, write: if request.auth != null && request.auth.token.email == email;
      }
    }
    
    // Activities are write-only for logged-in users
    match /activities/{activityId} {
      allow write: if request.auth != null;
      allow read: if request.auth != null && request.auth.token.email == "YOUR_ADMIN_EMAIL";
    }
  }
}
```

## 🎨 Customization

### Adding New Quest Templates

Edit `js/utils/questGenerator.js` and add templates to the `QUEST_TEMPLATES` object:

```javascript
blaze: {
  Easy: [
    { text: "Your new quest here!", minAge: 4 },
    // ...
  ]
}
```

### Adding Shop Items

Edit `js/config/constants.js` and add items to `SHOP_ITEMS`:

```javascript
{
  id: 'unique_id',
  name: 'Display Name',
  type: 'hat' | 'shirt' | 'glasses',
  price: 100,
  color: '#hexcolor',
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'mythic',
  minLevel: 1
}
```

## 📱 Browser Support

- Chrome 80+
- Safari 13+
- Firefox 75+
- Edge 80+

## 📄 License

MIT License - feel free to use and modify!

---

Made with ⚡ for awesome kids everywhere
