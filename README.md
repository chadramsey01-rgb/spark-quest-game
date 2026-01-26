# ⚡ Spark Quest

A gamified quest application that motivates children (ages 4-13) through RPG-style mechanics. Complete quests, earn Sparks, customize your avatar, and unlock rewards!

## 🎮 Features

- **Quest Spinner** - Generate age-appropriate quests across 4 categories (Blaze, Flow, Terra, Breeze)
- **Chore Tracking** - Parents can assign custom tasks with XP and Spark rewards
- **Avatar System** - Customize characters with unlockable hats, glasses, accessories & outfits
- **Shop** - Spend Sparks on cosmetics, mystery boxes, and real rewards
- **Real Rewards** - Parents can add redeemable prizes (screen time, treats, etc.)
- **Multi-Player** - Support for multiple children per family with side-by-side gameplay
- **Level Progression** - XP-based leveling with streak bonuses
- **Family Mode** - Spin quests for all kids at once

## 📁 Project Structure

```
spark-quest/
├── index.html              # Smart router (landing/login/hub redirect)
├── login.html              # User authentication
├── register.html           # New user registration
├── reset-password.html     # Password recovery
├── parent-hub.html         # Parent dashboard & kid management
├── play.html               # Main game interface for kids
├── admin-dashboard.html    # Admin analytics (restricted access)
└── README.md               # This file
```

## 🔄 User Flow

```
New Visitor → Landing Page → Register → Verify Email → Login → Parent Hub → Play
Returning User → Login Page → Parent Hub → Play
Logged In User → Parent Hub → Play
```

The root URL (`index.html`) automatically routes users based on their authentication state:
- **Logged in** → Redirects to Parent Hub
- **Returning user** (logged out) → Redirects to Login
- **New visitor** → Shows Landing Page

## 🚀 Deployment

### GitHub + Vercel (Recommended)

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

### Local Development

Serve files via a local server (required for Firebase):
```bash
npx serve .
# or
python -m http.server 8000
```

> ⚠️ Note: Opening files directly via `file://` won't work due to Firebase authentication requirements.

## 🔧 Configuration

### Firebase Setup

The app uses Firebase for authentication and data storage:

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Email/Password and Google authentication
3. Create a Firestore database
4. Update the Firebase config in each HTML file (search for `firebaseConfig`)

### API Key Security

**Important:** Restrict your Firebase API key to your domains:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project → APIs & Services → Credentials
3. Click your Browser key
4. Under "Application restrictions", select "HTTP referrers"
5. Add your domains:
   - `sparkquestgame.com/*`
   - `*.sparkquestgame.com/*`
   - `localhost:*/*` (for development)

### Firestore Security Rules

These rules are configured in your Firebase project:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAdmin() {
      return request.auth != null && request.auth.token.email == "YOUR_ADMIN_EMAIL";
    }
    
    match /parents/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if isAdmin();
      
      match /kids/{kidId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
        allow read: if isAdmin();
      }
    }
    
    match /activities/{activityId} {
      allow write: if request.auth != null;
      allow read: if isAdmin();
    }
    
    match /platformStats/{docId} {
      allow read, write: if isAdmin();
    }
  }
}
```

## 🎨 Customization

### Adding New Quest Templates

In `play.html`, find the `QUEST_TEMPLATES` object and add new templates:

```javascript
blaze: {
  Easy: [
    { text: "Your new quest here!", minAge: 4 },
    // ...
  ]
}
```

### Adding Shop Items

In `play.html`, find the `SHOP_ITEMS` array and add new items:

```javascript
{
  id: 'unique_id',
  name: 'Display Name',
  type: 'hat' | 'glasses' | 'accessory' | 'outfit' | 'background' | 'sticker',
  slot: 'hat' | 'glasses' | 'accessory', // for avatar parts
  price: 100,
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic',
  emoji: '🎩' // or use avatar preview
}
```

### Adding Chore Templates

In `play.html`, find `CHORE_TEMPLATES`:

```javascript
{ name: 'Chore name', sparks: 10, xp: 20, emoji: '✅' }
```

## 📱 Browser Support

- Chrome 80+
- Safari 13+
- Firefox 75+
- Edge 80+

## 🔒 Security Notes

- Firebase API keys are designed to be public (client-side)
- Real security comes from Firestore Security Rules
- Admin dashboard requires password + Google authentication
- User data is isolated by Firebase UID

## 📄 License

MIT License - feel free to use and modify!

---

Made with ⚡ for awesome families everywhere
