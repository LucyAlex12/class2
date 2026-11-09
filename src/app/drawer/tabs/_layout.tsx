import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabsLayout() {
  return (
      <Tabs
        screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#32063D",
        tabBarInactiveTintColor: "#999999",

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E1E8",
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../../assets/images/pageimages/icons/home.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#32063D" : "#999999",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="courses"
        options={{
          title: "Courses",
          tabBarLabel: "Courses",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../../assets/images/pageimages/icons/courses.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#32063D" : "#999999",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../../assets/images/pageimages/icons/profile.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#32063D" : "#999999",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
