# Gaussian Beam for Android

## Screenshot

<img src="https://github.com/user-attachments/assets/17358f3e-8878-48fd-a0c0-f69782cca152" alt="Image 1" width="32%"/>
<img src="https://github.com/user-attachments/assets/ca616797-e629-45be-b282-286e88f4a342" alt="Image 2" width="32%"/>

## Development

### How to Build

1. follow [Expo Docs](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build\&buildEnv=local) to set up your environment

2. install dependencies

   ```bash
   npm install
   ```

3. run this command to generate the native directory `android`

   ```bash
   npx expo prebuild --platform android --clean
   ```

4. follow [the instructions frmom Expo Docs](https://docs.expo.dev/guides/local-app-production/) to sign this app using your keystore
   * copy your keystore file to the directory `android/app`
   * edit the file `android/gradle.properties`
   * edit the file `android/app/build.gradle`

5. cd to the directory `android` and generate the APK file

   ```bash
   cd android
   ./gradlew assembleRelease
   ```

### Useful Commands

see [Tools for development](https://docs.expo.dev/develop/tools/)

* `npx expo-doctor`
* `npx expo install package-name`
* `npx expo run:android`

### Trouble Shooting

* [react-native doctor can't locale Android SDK](https://stackoverflow.com/questions/62797240/reactnative-cant-locate-android-sdk)

  Make sure that the Android SDK Command-line Tools (latest) was installed in the Android Studio Settings.

* [Execution failed for task ':react-native-reanimated:configureCMakeDebug\[arm64-v8a\]'](https://stackoverflow.com/questions/73904485/task-react-native-reanimatedconfigurecmakedebugarm64-v8a-failed)

  This happens because NDK has a limited number of path characters. Try to move this project to a directory with a shorter path, for example, directly under `C:\`
