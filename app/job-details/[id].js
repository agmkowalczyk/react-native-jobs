import { useCallback, useState } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router'
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components'
import useFetch from '../../hooks/useFetch'

import { COLORS, icons, SIZES } from '../../constants'

const tabs = ['About', 'Qualifications', 'Responsibilities']

const JobDetails = () => {
  const params = useGlobalSearchParams()
  const router = useRouter()

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: params.id,
  })

  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState(tabs[0])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }, [])

  const {
    employer_logo: companyLogo,
    job_title: jobTitle,
    employer_name: companyName,
    job_country: location,
    job_description: jobDescription,
    job_highlights: jobHighlights,
    job_google_link: jobLink,
  } = data.length && data[0]

  const displayTabContent = () => {
    switch (activeTab) {
      case 'About':
        return <JobAbout info={jobDescription ?? 'No data provided'} />
      case 'Qualifications':
        return (
          <Specifics
            title='Qualifications'
            points={jobHighlights?.Qualifications ?? ['N/A']}
          />
        )
      case 'Responsibilities':
        return (
          <Specifics
            title='Responsibilities'
            points={jobHighlights?.Responsibilities ?? ['N/A']}
          />
        )
      default:
        break
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: '',
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.lenth === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={companyLogo}
                jobTitle={jobTitle}
                companyName={companyName}
                location={location}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter url={jobLink ?? 'https://careers.google.com/jobs/results'} />
      </>
    </SafeAreaView>
  )
}

export default JobDetails
