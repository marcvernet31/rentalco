import AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

type AbstractContractInput = {
  UUID: string;
};

export default class DynamodbAccessor {
  private client: DocumentClient;
  private table: string;

  constructor(tableName: string) {
    this.table = tableName
    this.client =  new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
  }

  public putDocument = (input: AbstractContractInput) => {
    const params = {
      TableName: this.table,
      Item: input
    };
    return this.client.put(params, function(err, data) {
      if (err) {
        console.log("Error", err);
        return true
      } else {
        console.log("Success", data);
        return false
      }
    });
  }

  public deleteDocument = (key: string) => {
    const params = {
      Key: {
        "UUID": key
      },
      TableName: this.table
    };
   return this.client.delete(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
  }

  public queryByKey = (value: string) => {
    const params = {
      ExpressionAttributeValues: {
        ':v': value
       },
       KeyConditionExpression: 'UUID = :v',
       TableName: this.table
    }

    return this.client.query(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Items);
      }
    });
  }


}
