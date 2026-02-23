import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Image,
} from "react-native";

const { width } = Dimensions.get("window");

// Import custom icons
const icons = {
  home: require('../icons/home.png'),
  workout: require('../icons/weightlifting.png'),
  search: require('../icons/loupe.png'),
  favorite: require('../icons/add-to-favorites.png'),
  profile: require('../icons/user.png'),
};

const TABS = [
  { label: "Home", icon: "home" },
  { label: "Workout", icon: "workout" },
  { label: "Search", icon: "search" },
  { label: "Favorite", icon: "favorite" },
  { label: "Profile", icon: "profile" },
];

interface ModernBottomMenuProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const ModernBottomMenu: React.FC<ModernBottomMenuProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const [activeIndex, setActiveIndex] = useState(state.index);
  const bounceAnims = useRef(TABS.map(() => new Animated.Value(0))).current;
  const lineAnims = useRef(TABS.map(() => new Animated.Value(0))).current;
  const textOpacity = useRef(TABS.map(() => new Animated.Value(0))).current;
  const iconOpacity = useRef(TABS.map(() => new Animated.Value(0.8))).current;
  const iconScale = useRef(TABS.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    setActiveIndex(state.index);
    animateTab(state.index);
  }, [state.index]);

  const animateTab = (index: number) => {
    TABS.forEach((_, i) => {
      if (i === index) {
        // Active tab animations
        // Bounce animation
        Animated.sequence([
          Animated.timing(bounceAnims[i], {
            toValue: -8,
            duration: 150,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),
          Animated.timing(bounceAnims[i], {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();

        // Line expand
        Animated.timing(lineAnims[i], {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }).start();

        // Text fade in (show name for active tab)
        Animated.timing(textOpacity[i], {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();

        // Icon scale up and full opacity for active
        Animated.parallel([
          Animated.timing(iconOpacity[i], {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.spring(iconScale[i], {
            toValue: 1.2,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        // Inactive tabs - hide line and text, keep icon visible with animation
        Animated.timing(lineAnims[i], {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();

        // Hide text for inactive tabs
        Animated.timing(textOpacity[i], {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();

        // Scale down and reduce opacity for inactive icons
        Animated.parallel([
          Animated.timing(iconOpacity[i], {
            toValue: 0.7,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(iconScale[i], {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start();
      }
    });
  };

  const handleTabPress = (index: number) => {
    const route = state.routes[index];
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      setActiveIndex(index);
      navigation.navigate(route.name);
    }
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab, index) => {
        const lineWidth = lineAnims[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, width / TABS.length - 30],
        });

        return (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            activeOpacity={0.8}
            onPress={() => handleTabPress(index)}
          >
            <Animated.View
              style={{
                transform: [
                  { translateY: bounceAnims[index] },
                  { scale: iconScale[index] }
                ],
                opacity: iconOpacity[index],
              }}
            >
              <Image
                source={icons[tab.icon as keyof typeof icons]}
                style={[
                  styles.iconImage,
                  {
                    tintColor: activeIndex === index ? "#6366f1" : "#9ca3af",
                  },
                ]}
                resizeMode="contain"
              />
            </Animated.View>

            {/* Text only shows for active tab */}
            <Animated.Text
              style={[
                styles.label,
                {
                  opacity: textOpacity[index],
                  color: "#6366f1",
                },
              ]}
            >
              {tab.label}
            </Animated.Text>

            <Animated.View
              style={[
                styles.line,
                {
                  width: lineWidth,
                  backgroundColor: "#6366f1",
                },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ModernBottomMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#111827",
    elevation: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  line: {
    height: 3,
    marginTop: 4,
    borderRadius: 2,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
});