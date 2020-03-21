import bodyParser from 'body-parser';
import { Picker } from 'meteor/meteorhacks:picker';

Picker.middleware(bodyParser.json());

Picker.route('/webhooks/:service', (params, request, response) => {
  console.log(params);
  const { body } = request;
  console.log(body);
  response.writeHead(200);
  response.end('[200] Webhook received.');
});
