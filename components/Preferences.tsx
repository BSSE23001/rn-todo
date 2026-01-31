import { createSettingsStyles } from '@/assets/styles/settings.styles';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';

const Preferences = () => {
    const [isAutoSync, setIsAutoAsync] = useState(true);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  const {colors, isDarkMode, toggleDarkMode} = useTheme()

  const settingsStyles = createSettingsStyles(colors)

  return (
    <LinearGradient
    colors={colors.gradients.surface}
    style={settingsStyles.section}
    >
        <Text style={settingsStyles.sectionTitle}>Preferences</Text>
        <View style={settingsStyles.settingItem}>
            <View style={settingsStyles.settingLeft}>
                <LinearGradient colors={colors.gradients.primary} style={settingsStyles.settingIcon}>
                    <Ionicons name='moon' size={18} color={"#ffffff"} />
                </LinearGradient>
                <Text style={settingsStyles.settingText}>Dark Mode</Text>
            </View>
            <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            thumbColor={"#fff"}
            trackColor={{false: "red", true: colors.primary}}
            />
        </View>
        <View style={settingsStyles.settingItem}>
            <View style={settingsStyles.settingLeft}>
                <LinearGradient colors={colors.gradients.warning} style={settingsStyles.settingIcon}>
                    <Ionicons name='notifications' size={18} color={"#ffffff"} />
                </LinearGradient>
                <Text style={settingsStyles.settingText}>Notifications</Text>
            </View>
            <Switch
            value={isNotificationEnabled}
            onValueChange={() => setIsNotificationEnabled(!isNotificationEnabled)}
            thumbColor={"#fff"}
            trackColor={{false: "red", true: colors.warning}}
            />
        </View>
        <View style={settingsStyles.settingItem}>
            <View style={settingsStyles.settingLeft}>
                <LinearGradient colors={colors.gradients.success} style={settingsStyles.settingIcon}>
                    <Ionicons name='notifications' size={18} color={"#ffffff"} />
                </LinearGradient>
                <Text style={settingsStyles.settingText}>Auto Sync</Text>
            </View>
            <Switch
            value={isAutoSync}
            onValueChange={() => setIsAutoAsync(!isAutoSync)}
            thumbColor={"#fff"}
            trackColor={{false: "red", true: colors.success}}
            />
        </View>
    </LinearGradient>
  )
}

export default Preferences