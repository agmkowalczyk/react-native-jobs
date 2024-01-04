import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'

import styles from './popularjobcard.style'
import { images } from '../../../../constants'

const PopularJobCard = ({ item, handleCardPress, selectedJob }) => {
  return (
    <Pressable
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <Pressable style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={
            item.employer_logo ? { uri: item.employer_logo } : images.jobLogo
          }
          resizeMode='contain'
          style={styles.logoImage}
        />
      </Pressable>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title}
        </Text>
        <Text style={styles.location}>{item.job_country}</Text>
      </View>
    </Pressable>
  )
}

export default PopularJobCard
