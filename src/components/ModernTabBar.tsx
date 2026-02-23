import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { HomeIcon, ActivityIcon, SearchIcon, HeartIcon, PersonIcon } from '../icons';
import { theme } from '../theme';

const { width } = Dimensions.get("window");

export interface InteractiveMenuItem {
  label: string;
  icon: string;
  key: string;
  IconComponent?: React.ComponentType<{ size: number; color: string }>;
}

export interface ModernTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  items?: InteractiveMenuItem[];
  accentColor?: string;
}

const defaultItems: InteractiveMenuItem[] = [
  { label: "Home", icon: "home", key: "Home", IconComponent: HomeIcon },
  { label: "Workout", icon: "activity", key: "Workouts", IconComponent: ActivityIcon },
  { label: "Search", icon: "search", key: "Search", IconComponent: SearchIcon },
  { label: "Favorite", icon: "heart", key: "Favorites", IconComponent: HeartIcon },
  { label: "Profile", icon: "user", key: "Profile", IconComponent: PersonIcon },
];

const ModernTabBar: React.FC<ModernTabBarProps> = ({
  state,
  descriptors,
  navigation,
  items,
  accentColor,
}) => {
  // Use provided items or default
  const finalItems = items && Array.isArray(items) && items.length >= 2 && items.length <= 5 
    ? items 
    : defaultItems;

  const finalAccentColor = accentColor || "#6366f1";
  const [activeIndex, setActiveIndex] = useState(state.index);
  
  const bounceAnims = useRef(finalItems.map(() => new Animated.Value(0))).current;
  const lineAnims = useRef(finalItems.map(() => new Animated.Value(0))).current;
  const textOpacity = useRef(finalItems.map(() => new Animated.Value(0.6))).current;

  useEffect(() => {
    setActiveIndex(state.index);
    animateTab(state.index);
  }, [state.index]);

  const animateTab = (index: number) => {
    finalItems.forEach((_, i) => {
      if (i === index) {
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

        // Text fade in
        Animated.timing(textOpacity[i], {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(lineAnims[i], {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();

        Animated.timing(textOpacity[i], {
          toValue: 0.6,
          duration: 200,
          useNativeDriver: true,
        }).start();
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
      {finalItems.map((tab, index) => {
        const lineWidth = lineAnims[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, width / finalItems.length - 30],
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
                transform: [{ translateY: bounceAnims[index] }],
              }}
            >
              {tab.IconComponent ? (
                <tab.IconComponent
                  size={22}
                  color={activeIndex === index ? finalAccentColor : "#9ca3af"}
                />
              ) : (
                <HomeIcon
                  size={22}
                  color={activeIndex === index ? finalAccentColor : "#9ca3af"}
                />
              )}
            </Animated.View>

            <Animated.Text
              style={[
                styles.label,
                {
                  opacity: textOpacity[index],
                  color: activeIndex === index ? finalAccentColor : "#9ca3af",
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
                  backgroundColor: finalAccentColor,
                },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ModernTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    backgroundColor: theme.colors.card,
    elevation: 10,
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  line: {
    height: 3,
    marginTop: 4,
    borderRadius: 2,
  },
});