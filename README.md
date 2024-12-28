# Gaussian Beam for Android

## Development

### Build APK

1. `npx expo prebuild --clean`

2. follow the instruction to sign the app using your own key
    https://docs.expo.dev/guides/local-app-production/

3. `cd android && ./gradlew assembleRelease`
    https://stackoverflow.com/questions/35935060/how-can-i-generate-an-apk-that-can-run-without-server-with-react-native/46170797#46170797

### Useful Commands

[Tools for development](https://docs.expo.dev/develop/tools/)
> `npx expo-doctor`  
> `npx expo install package-name`  
> `npx expo run:android`  
> `npx expo prebuild --clean`

```
npx react-native doctor
```

###  Trouble Shooting

- react-native doctor can't locale Android SDK

    https://stackoverflow.com/questions/62797240/reactnative-cant-locate-android-sdk
    > make sure that the Android SDK Command-line Tools (latest) was installed in the Android Studio Settings.

- Execution failed for task ':react-native-reanimated:configureCMakeDebug[arm64-v8a]'
    https://stackoverflow.com/questions/73904485/task-react-native-reanimatedconfigurecmakedebugarm64-v8a-failed
    > NDK has a limited number of path characters

    Move the project to a shorter directory, for example, directly under `C:\`
