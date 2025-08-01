# 🎉 The GZ Quiz - Eğlenceli Sorular!

A fun, interactive Turkish quiz game inspired by The Impossible Quiz, designed to make your wife laugh! 

## 🌈 Features

- **Bright & Playful Design**: Candy-colored gradient background with cartoonish fonts
- **2-Life System**: Cute heart icons that disappear when you lose lives
- **Smooth Animations**: Hover effects, button animations, and fun transitions
- **Special "CEVAP" Button**: The first question has an extra-large, prominent button
- **Mobile-Friendly**: Fully responsive design that works on all devices
- **Sound Effects**: Optional beep sounds for correct/wrong answers
- **Turkish Interface**: All text and buttons in Turkish

## 🎮 How to Play

1. Open `index.html` in any modern web browser
2. Click "Oyuna Başla!" to start
3. Answer the quirky questions - you have 2 lives!
4. If you lose both lives, you'll see a fun "Game Over" screen
5. Complete all questions to see the victory screen!

## 📝 Customizing Questions

To add or edit questions, modify the `questions` array in `script.js`:

```javascript
const questions = [
  {
    number: "?", // Always "?" to keep it ambiguous
    question: "Your question here",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correct: "Correct answer",
    specialStyling: { answerButtonSize: "extra-large" } // Optional: makes button huge
  },
  // Add more questions...
];
```

## 🎨 Customizing Design

- **Colors**: Edit the CSS variables in `style.css` to change the color scheme
- **Fonts**: The game uses Google Fonts - "Fredoka One" for titles and "Comic Neue" for body text
- **Animations**: Modify the CSS animations to change the feel of the game

## 🚀 Technical Details

- **Pure Vanilla**: No external frameworks - just HTML, CSS, and JavaScript
- **Client-Side**: All game logic runs in the browser
- **Accessible**: Keyboard support (1-4 keys for answers, Enter for navigation)
- **Cross-Platform**: Works on desktop, tablet, and mobile devices

## 🎯 Game Mechanics

- **Life System**: 2 hearts, lose one for each wrong answer
- **Question Progression**: Move to next question after correct answer or life loss
- **Victory Condition**: Complete all questions without losing both lives
- **Game Over**: Lose both lives and see the restart screen

## 🎁 Bonus Features

- **Sound Effects**: Simple beep sounds for feedback (optional)
- **Keyboard Support**: Use number keys 1-4 to answer questions
- **Smooth Transitions**: Fade-in animations between screens
- **Responsive Hearts**: Animated heart icons that pulse and shake

Enjoy the game! 🎊 