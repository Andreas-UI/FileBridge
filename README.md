# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

# Tech Stack for FileBridge  

FileBridge is built using modern and efficient technologies to provide a seamless and high-performance file-sharing experience. Below is an in-depth breakdown of the technologies we used and why they were chosen.  

## 📦 Framework & Development Tools  

### [**Expo**](https://expo.dev/)

Expo is a powerful framework for building universal React Native applications. It simplifies the development process by offering a managed workflow, allowing for easier testing, deployment, and maintenance. With Expo, we can quickly iterate on features, leverage built-in APIs, and ensure smooth performance across different platforms without dealing with complex native configurations.  

## 🎨 UI & Styling  

### [**Gluestack v2**](https://gluestack.io/)  

For styling and UI components, we chose **Gluestack v2**, a robust component library that allows for flexible theming and scalable UI development. It provides a utility-based styling approach, similar to Tailwind CSS, making it easy to build a responsive and customizable interface while keeping performance in check.  

### [**Lucide**](https://lucide.dev/)  

Lucide is a modern, open-source icon library that offers a clean and consistent design. It ensures that our app maintains a polished look with well-crafted icons that enhance usability and visual appeal.  

## 🚀 Performance & Optimization  

### [**Shopify - FlashList**](https://shopify.github.io/flash-list/)  

Since our app deals with file management, efficient rendering of file lists is crucial. We use **FlashList**, a high-performance list rendering library developed by Shopify, to ensure smooth scrolling and optimal memory usage, even when handling large numbers of files. Compared to React Native’s default FlatList, FlashList offers superior performance and responsiveness.  

### [**React Reanimated**](https://docs.swmansion.com/react-native-reanimated/)  

To create smooth and fluid animations, we utilize **React Reanimated**. This library allows us to build performant animations and gesture-driven interactions without impacting app performance. It works seamlessly with **React Gesture**, making UI transitions feel more natural and engaging.  

### [**React Gesture**](https://docs.swmansion.com/react-native-gesture-handler/docs/)  

React Gesture enables complex touch gestures, such as swipes and drags, to be handled efficiently. It enhances the user experience by providing intuitive touch interactions that feel responsive and natural.  

## 🔥 State Management & Data Fetching  

### [**Redux**](https://react-redux.js.org/)  

For managing global state efficiently, we rely on **Redux**. It helps keep our app’s state predictable and scalable, ensuring that changes in one part of the app are seamlessly reflected everywhere they need to be.

### [**TanStack Query**](https://tanstack.com/)  

To handle data fetching, caching, and synchronization, we use **TanStack Query**. This powerful library ensures our API calls are optimized, reducing unnecessary re-fetching while keeping data up to date in real-time. It improves app performance and reduces load times, making file sharing and access more efficient.  

## 🎬 Animations & User Engagement  

### [**Lottie**](https://github.com/lottie-react-native/lottie-react-native#usage)  

To make the app more engaging, we integrate **Lottie**, a library that enables the use of lightweight, vector-based animations. Lottie animations help improve the overall user experience by providing smooth visual feedback, such as loading indicators and success confirmations, without compromising performance.  

---

### **Why This Tech Stack?**  

The combination of these technologies ensures that FileBridge is:  

- **Fast and responsive** – With FlashList, React Reanimated, and optimized data fetching.  
- **Scalable and maintainable** – Using Redux for state management and Expo for easy deployment.  
- **User-friendly and visually appealing** – Thanks to Gluestack v2, Lucide icons, and Lottie animations.  
- **Efficient and seamless** – Offering smooth file uploads, sharing, and QR code generation with minimal friction.  

With this tech stack, we aim to provide an intuitive and high-performance platform for effortless file sharing. 🚀
