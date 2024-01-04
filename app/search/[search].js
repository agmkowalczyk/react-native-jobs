import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  View,
} from 'react-native'
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'
import { ScreenHeaderBtn, NearbyJobCard } from '../../components'
import useFetch from '../../hooks/useFetch'

import { COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/search'

const JobSearch = () => {
  const params = useGlobalSearchParams()
  const router = useRouter()

  const [page, setPage] = useState(1)

  const { data, isLoading, error, refetch } = useFetch('search', {
    query: params.search,
    page: page.toString(),
  })

  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage((page) => page - 1)
    } else if (direction === 'right') {
      setPage((page) => page + 1)
    }
  }
  
  useEffect(() => {
    refetch()
  }, [page])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerTitle: '',
        }}
      />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.search}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
              ) : (
                error && <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <Pressable
              style={styles.paginationButton}
              onPress={() => handlePagination('left')}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode='contain'
              />
            </Pressable>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <Pressable
              style={styles.paginationButton}
              onPress={() => handlePagination('right')}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode='contain'
              />
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default JobSearch
