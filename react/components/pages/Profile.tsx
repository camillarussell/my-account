import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'vtex.my-account-commons/Router'
import { compose, branch, renderComponent, withProps } from 'recompose'

import { withContentWrapper } from '../shared/withContentWrapper'
import ProfileLoading from '../loaders/ProfileLoading'
import ProfileBox from '../Profile/ProfileBox'
import Toast from '../shared/Toast'
import GET_B2BPROFILE from '../../graphql/getB2bProfile.gql'
import NewsletterBox from '../Profile/NewsletterBox'

export const headerConfig = {
  titleId: 'vtex.store-messages@0.x::pages.profile',
  hideBackButton: true,
}

class ProfileContainer extends Component<Props> {
  public state = {
    showToast: false,
  }

  public componentDidMount = () => {
    const { location } = this.props

    this.setState({ showToast: location.search.indexOf('success=true') > -1 })
  }

  private handleCloseToast = () => {
    this.setState({ showToast: false })
  }

  public render() {
    const { profile, procurator } = this.props
    const { showToast } = this.state
    return (
      <main className="flex flex-column-s flex-row-ns">
        <div className="w-60-ns w-100-s">
          <ProfileBox profile={profile} procurator={procurator} />
        </div>
        <div className="w-40-ns w-100-s">
          <NewsletterBox userEmail={profile.email} />
        </div>
        {showToast && (
          <Toast
            messageId="vtex.store-messages@0.x::alert.success"
            onClose={this.handleCloseToast}
          />
        )}
      </main>
    )
  }
}

interface Props {
  location: any
  history: any
  profile: Profile
  procurator: ProcuratorData
  data: {
    profile: Profile,
    getProcuratorData: ProcuratorData
  }
}

const enhance = compose<Props, void>(
  graphql(GET_B2BPROFILE),
  branch<Props>(
    ({ data }) => data.profile == null,
    renderComponent(ProfileLoading)
  ),
  withContentWrapper({
    headerConfig,
    handle: { configHandle: 'profile', contentHandle: '' },
  }),
  withProps(({ data }: Props) => ( { profile: data.profile, procurator: data.getProcuratorData })),
  withRouter
)

export default enhance(ProfileContainer)
