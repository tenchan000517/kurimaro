// src/lib/dynamodb.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

const docClient = DynamoDBDocumentClient.from(client);

export async function getFacility(facilityId) {
  const command = new GetCommand({
    TableName: process.env.DYNAMODB_FACILITIES_TABLE,
    Key: { id: facilityId },
  });
  const response = await docClient.send(command);
  return response.Item;
}

export async function saveStamp(stampData) {
  const command = new PutCommand({
    TableName: process.env.DYNAMODB_USER_STAMPS_TABLE,
    Item: stampData,
  });
  return docClient.send(command);
}

export async function getFacilitiesByPrefecture(prefecture) {
  const command = new QueryCommand({
    TableName: process.env.DYNAMODB_FACILITIES_TABLE,
    IndexName: "prefecture-index",
    KeyConditionExpression: "prefecture = :prefecture",
    ExpressionAttributeValues: {
      ":prefecture": prefecture
    }
  });
  const response = await docClient.send(command);
  return response.Items;
}