import React from "react";
import Layout from "../components/Layout";
import factory from "../ethereum/factory";
import { Link } from "../routes";
import Organization from "../ethereum/organization";

import { Card, Grid, Button, Icon } from "semantic-ui-react";
import ContributeForm from "../components/ContributeForm";
import web3 from "../ethereum/web3";


class Index extends React.Component { 

   static getInitialProps = async props => {
    props.query.address = '0x5b29576369c4d43256EcC20B7B52721E47C8dDe0';    
    const organization = Organization(props.query.address);
    const summary = await organization.methods.getSummary().call();
    const name = await organization.methods.organizationName().call();

    return {
      address: 'props.query.address',
      minContributions: summary[0],
      balance: summary[1],
      requests: summary[2],
      contributors: summary[3],
      name: name
    };
  };

  renderCards = () => {
    const items = [
      {
        header: "Donation Amount",
        meta: "Total amount donated in the organization",
        description: <h2>{web3.utils.fromWei(this.props.balance, "ether")}</h2>,
        style: { overflowWrap: "break-word" }
      },
      {
        header: "Requests",
        meta: "Total Number Of Requests",
        description: <h2>{this.props.requests}</h2>,
        style: { overflowWrap: "break-word" }
      },
      {
        header: "Contributors",
        meta: "Number of people who donated",
        description: <h2>{this.props.contributors}</h2>,
        style: { overflowWrap: "break-word" }
      },
      {
        header: "Minimum Contibution",
        meta: "Minimum value to contribute",
        description: <h2>{this.props.minContributions}</h2>,
        style: { overflowWrap: "break-word" }
      }
    ];

    return <Card.Group items={items} />;
  };
  render() {
    return (
      <Layout>
        <h2>{this.props.name}</h2>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <h3>Contribute To This Organization</h3>
              <ContributeForm address='0x5b29576369c4d43256EcC20B7B52721E47C8dDe0' />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/organizations/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
              <Link route={`/`}>
                <a>
                  <h1>test</h1>
                  <Button icon labelPosition="left" primary>
                    <Icon name="left arrow" />
                    Back
                  </Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default Index;
