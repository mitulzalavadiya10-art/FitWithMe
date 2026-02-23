import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { theme } from '../theme';

// Import custom icons
const icons = {
  home: require('../icons/home.png'),
  workouts: require('../icons/weightlifting.png'),
  search: require('../icons/loupe.png'),
  favorites: require('../icons/add-to-favorites.png'),
  profile: require('../icons/user.png'),
};

export interface InteractiveMenuItem {
  label: string;
  icon: keyof typeof icons;
  key: string;
}

export interface ModernTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  items?: InteractiveMenuItem[];
  accentColor?: string;
}

const defaultItems: InteractiveMenuItem[] = [
  { label: 'home', icon: 'home', key: 'Home' },
  { label: 'workouts', icon: 'workouts', key: 'Workouts' },
  { label: 'search', icon: 'search', key: 'Search' },
  { label: 'favorites', icon: 'favorites', key: 'Favorites' },
  { label: 'profile', icon: 'profile', key: 'Profile' },
];

const defaultAccentColor = theme.colors.primary;
const { width: screenWidth } = Dimensions.get('window');

const ModernTabBar: React.FC<ModernTabBarProps> = ({ 
  state, 
  descriptors, 
  navigation, 
  items, 
  accentColor 
}) => {
  // Validate items exactly like web component
  const finalItems = useMemo(() => {
    const isValid = items && Array.isArray(items) && items.length >= 2 && items.length <= 5;
    if (!isValid) {
      console.warn("ModernTabBar: 'items' prop is invalid or missing. Using default items.", items);
      return defaultItems;
    }
    return items;
  }, [items]);

  const [activeIndex, setActiveIndex] = useState(0);
  const textRefs = useRef<(Text | null)[]>([]);
  const itemRefs = useRef<(View | null)[]>([]);
  const lineWidthAnim = useRef(new Animated.Value(0)).current;
  const linePositionAnim = useRef(new Animated.Value(0)).current;
  const iconBounceAnims = useRef(finalItems.map(() => new Animated.Value(0))).current;

  const tabWidth = screenWidth / finalItems.length;

  useEffect(() => {
    if (state.index >= finalItems.length) {
      setActiveIndex(0);
    } else {
      setActiveIndex(state.index);
    }
  }, [finalItems, state.index]);

  useEffect(() => {
    // Set line width and position like web component
    const setLineWidth = () => {
      const activeTextWidth = tabWidth * 0.6; // Approximate text width
      const newPosition = activeIndex * tabWidth + (tabWidth - activeTextWidth) / 2;
      
      Animated.parallel([
        Animated.timing(linePositionAnim, {
          toValue: newPosition,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(lineWidthAnim, {
          toValue: activeTextWidth,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    };

    setLineWidth();

    // Icon bounce animation exactly like web component keyframes
    const bounceAnimation = () => {
      const activeIconAnim = iconBounceAnims[activeIndex];
      if (activeIconAnim) {
        // Reset other icons
        iconBounceAnims.forEach((anim, index) => {
          if (index !== activeIndex) {
            anim.setValue(0);
          }
        });

        // Bounce sequence: 0% -> 20% -> 40% -> 60% -> 80% -> 100%
        Animated.sequence([
          // 0% to 20%: translateY(0) to translateY(-0.3em)
          Animated.timing(activeIconAnim, {
            toValue: -12, // -0.3em equivalent
            duration: 60, // 20% of 300ms
            useNativeDriver: true,
          }),
          // 20% to 40%: translateY(-0.3em) to translateY(0)
          Animated.timing(activeIconAnim, {
            toValue: 0,
            duration: 60, // 20% of 300ms
            useNativeDriver: true,
          }),
          // 40% to 60%: translateY(0) to translateY(-0.1em)
          Animated.timing(activeIconAnim, {
            toValue: -4, // -0.1em equivalent
            duration: 60, // 20% of 300ms
            useNativeDriver: true,
          }),
          // 60% to 80%: translateY(-0.1em) to translateY(0)
          Animated.timing(activeIconAnim, {
            toValue: 0,
            duration: 60, // 20% of 300ms
            useNativeDriver: true,
          }),
          // 80% to 100%: stay at translateY(0)
          Animated.timing(activeIconAnim, {
            toValue: 0,
            duration: 60, // 20% of 300ms
            useNativeDriver: true,
          }),
        ]).start();
      }
    };

    bounceAnimation();
  }, [activeIndex, finalItems, tabWidth]);

  const handleItemClick = (index: number) => {
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

  const finalAccentColor = accentColor || defaultAccentColor;

  return (
    <View style={[styles.menu, { '--component-active-color': finalAccentColor } as any]}>
      {/* Animated underline */}
      <Animated.View
        style={[
          styles.underline,
          {
            backgroundColor: finalAccentColor,
            width: lineWidthAnim,
            left: linePositionAnim,
          },
        ]}
      />

      {/* Menu items */}
      <View style={styles.menuContainer}>
        {finalItems.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuItem,
                isActive && styles.active,
                { width: tabWidth }
              ]}
              onPress={() => handleItemClick(index)}
              ref={(el) => (itemRefs.current[index] = el)}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.menuIcon,
                  {
                    transform: [{ translateY: iconBounceAnims[index] }],
                  },
                ]}
              >
                <Image
                  source={icons[item.icon]}
                  style={[
                    styles.iconImage,
                    {
                      tintColor: isActive ? finalAccentColor : theme.colors.textTertiary,
                    },
                  ]}
                  resizeMode="contain"
                />
              </Animated.View>
              
              <Text
                ref={(el) => (textRefs.current[index] = el)}
                style={[
                  styles.menuText,
                  isActive && [styles.activeText, { color: finalAccentColor }],
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
    paddingTop: 8,
    position: 'relative',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  underline: {
    position: 'absolute',
    top: 0,
    height: 3,
    borderRadius: 2,
    zIndex: 1,
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    minHeight: 60,
  },
  active: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  menuIcon: {
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    // Icon styles
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  menuText: {
    fontSize: 11,
    fontWeight: '500',
    color: theme.colors.textTertiary,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  activeText: {
    fontWeight: '700',
    fontSize: 12,
  },
});

export default ModernTabBar;