import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { 
  FitnessIcon, 
  BodyIcon, 
  WalkIcon, 
  BarbellIcon, 
  AccessibilityIcon, 
  HeartIcon, 
  PlayIcon 
} from '../icons';
import { Exercise } from '../api/types';
import { theme } from '../theme';
import { capitalize } from '../utils/helpers';

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

// Get icon component for muscle groups
const getMuscleGroupIcon = (muscle: string, size: number, color: string) => {
  const muscleType = muscle.toLowerCase();
  switch (muscleType) {
    case 'chest':
      return <FitnessIcon size={size} color={color} filled={false} />;
    case 'back':
    case 'core':
      return <BodyIcon size={size} color={color} filled={false} />;
    case 'legs':
      return <WalkIcon size={size} color={color} />;
    case 'biceps':
    case 'triceps':
      return <BarbellIcon size={size} color={color} filled={false} />;
    case 'shoulders':
      return <AccessibilityIcon size={size} color={color} />;
    case 'cardio':
    case 'full body':
      return <HeartIcon size={size} color={color} filled={false} />;
    default:
      return <FitnessIcon size={size} color={color} filled={false} />;
  }
};

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onPress,
  onFavorite,
  isFavorite = false,
}) => {
  const bodyPart = exercise.bodyPart || exercise.muscle || 'general';
  const equipment = exercise.equipment || 'body only';
  
  // Get exercise image or fallback to icon
  const hasImage = exercise.gifUrl && typeof exercise.gifUrl === 'number';
  const imageSource = hasImage ? exercise.gifUrl : null;
  
  const getExerciseColor = () => {
    const muscleGroup = exercise.muscle.toLowerCase();
    const colorMap: { [key: string]: string } = {
      'chest': '#FF6B6B',
      'back': '#4ECDC4',
      'legs': '#45B7D1',
      'biceps': '#96CEB4',
      'triceps': '#FFEAA7',
      'shoulders': '#DDA0DD',
      'core': '#98D8C8',
      'cardio': '#F7DC6F',
    };
    return colorMap[muscleGroup] || theme.colors.primary;
  };

  const exerciseColor = getExerciseColor();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        {hasImage ? (
          <Image 
            source={imageSource} 
            style={styles.image} 
            resizeMode="cover"
            onError={() => console.log('Image failed to load')}
          />
        ) : (
          <View style={[styles.image, styles.iconContainer, { backgroundColor: exerciseColor + '20' }]}>
            {getMuscleGroupIcon(exercise.muscle, 64, exerciseColor)}
          </View>
        )}
        <View style={styles.overlay}>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercise.difficulty) }]}>
            <Text style={styles.difficultyText}>{capitalize(exercise.difficulty || 'beginner')}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {capitalize(exercise.name)}
        </Text>
        <View style={styles.tags}>
          <View style={styles.tag}>
            <BodyIcon size={14} color={theme.colors.textSecondary} filled={false} />
            <Text style={styles.tagText}>{capitalize(bodyPart)}</Text>
          </View>
          <View style={styles.tag}>
            <BarbellIcon size={14} color={theme.colors.textSecondary} filled={false} />
            <Text style={styles.tagText}>{capitalize(equipment)}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.playButton}>
            <PlayIcon size={16} color={theme.colors.primary} />
            <Text style={styles.playText}>Start Exercise</Text>
          </View>
        </View>
      </View>
      
      {onFavorite && (
        <TouchableOpacity style={styles.favoriteButton} onPress={onFavorite}>
          <HeartIcon
            size={24}
            color={isFavorite ? theme.colors.error : theme.colors.white}
            filled={isFavorite}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const getDifficultyColor = (difficulty?: string) => {
  switch (difficulty?.toLowerCase()) {
    case 'beginner':
      return '#00D4AA';
    case 'intermediate':
      return '#FFA726';
    case 'advanced':
      return '#FF5757';
    default:
      return '#00D4AA';
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  iconContainer: {
    backgroundColor: theme.colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  difficultyText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.white,
  },
  content: {
    padding: theme.spacing.md,
  },
  name: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundTertiary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    gap: theme.spacing.xs,
  },
  tagText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.xs,
  },
  playText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.primary,
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: theme.borderRadius.full,
    padding: theme.spacing.sm,
  },
});
