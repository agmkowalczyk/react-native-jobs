import React from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'

import styles from './tabs.style'
import { SIZES } from '../../../constants'

const TabButton = ({ name, activeTab, onHandleActiveTab }) => (
  <Pressable style={styles.btn(name, activeTab)} onPress={onHandleActiveTab}>
    <Text style={styles.btnText(name, activeTab)}>{name}</Text>
  </Pressable>
)

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View styles={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleActiveTab={() => setActiveTab(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
      />
    </View>
  )
}

export default Tabs
