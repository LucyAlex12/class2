import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
      <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },

        headerTintColor: "#32063D",

        headerTitleStyle: {
          fontWeight: "800",
        },

        drawerActiveTintColor: "#32063D",

        drawerInactiveTintColor: "#777777",

        drawerActiveBackgroundColor: "#E9DDF0",

        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "600",
        },

        drawerStyle: {
          backgroundColor: "#FFFFFF",
          width: 280,
        },
      }}
    >
      <Drawer.Screen
        name="tabs"
        options={{
          title: "Learning",
          drawerLabel: "Learning",
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          title: "Settings",
          drawerLabel: "Settings",
        }}
      />

      <Drawer.Screen
        name="course_lists"
        options={{
          title: "Course Lists",
          drawerLabel: "Course Lists",
        }}
      />

      <Drawer.Screen
        name="realm_lessons"
        options={{
          title: "Realm Lessons",
          drawerLabel: "Realm Lessons",
        }}
      />

      <Drawer.Screen
        name="api_lessons"
        options={{
          title: "API Lessons",
          drawerLabel: "API Lessons",
        }}
      />
    </Drawer>
  );
}
