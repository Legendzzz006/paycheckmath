# Mobile Testing Guide

## Option 1: USB Debugging (Android)

### Setup:
1. Enable Developer Options on your Android phone:
   - Go to Settings > About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings > Developer Options
   - Enable "USB Debugging"

2. Connect your phone via USB to your computer

3. Run this command to forward the port:
   ```bash
   adb reverse tcp:3000 tcp:3000
   ```

4. On your phone's browser, go to:
   ```
   http://localhost:3000
   ```

### Install ADB (if not installed):
Download from: https://developer.android.com/tools/releases/platform-tools

Or install via Chocolatey:
```bash
choco install adb
```

## Option 2: Use Ngrok (Easiest)

### Setup:
1. Install ngrok:
   ```bash
   choco install ngrok
   ```
   Or download from: https://ngrok.com/download

2. Start ngrok:
   ```bash
   ngrok http 3000
   ```

3. Ngrok will give you a public URL like:
   ```
   https://abc123.ngrok.io
   ```

4. Open that URL on your phone (works from anywhere, not just local network)

## Option 3: Localtunnel (Free alternative to ngrok)

### Setup:
1. Install localtunnel globally:
   ```bash
   npm install -g localtunnel
   ```

2. Start the tunnel:
   ```bash
   lt --port 3000
   ```

3. You'll get a URL like:
   ```
   https://random-name.loca.lt
   ```

4. Open that URL on your phone

## Option 4: Deploy to Vercel (Production testing)

### Setup:
1. Push code to GitHub

2. Import to Vercel:
   - Go to vercel.com
   - Click "Import Project"
   - Select your GitHub repo
   - Deploy

3. You'll get a live URL like:
   ```
   https://your-project.vercel.app
   ```

4. Access from any device

## Option 5: Check Windows Firewall

If network access isn't working, your firewall might be blocking it.

### Allow Next.js through firewall (Run as Administrator):
```bash
netsh advfirewall firewall add rule name="Next.js Dev Server" dir=in action=allow protocol=TCP localport=3000
```

Or manually:
1. Open Windows Defender Firewall
2. Click "Advanced settings"
3. Click "Inbound Rules" > "New Rule"
4. Select "Port" > Next
5. Enter port 3000 > Next
6. Allow the connection > Next
7. Apply to all profiles > Next
8. Name it "Next.js Dev" > Finish

## Recommended: Use Ngrok or Localtunnel

These are the easiest options and work from anywhere, not just your local network.
