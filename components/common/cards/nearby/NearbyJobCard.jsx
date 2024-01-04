import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'

import styles from './nearbyjobcard.style'
import { images } from '../../../../constants'

const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <Pressable style={styles.container} onPress={handleNavigate}>
      <Pressable style={styles.logoContainer}>
        <Image
          source={
            job.employer_logo ? { uri: job.employer_logo } : images.jobLogo
          }
          resizeMode='contain'
          style={styles.logoImage}
        />
      </Pressable>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job.job_title}
        </Text>
        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>
    </Pressable>
  )
}

export default NearbyJobCard
