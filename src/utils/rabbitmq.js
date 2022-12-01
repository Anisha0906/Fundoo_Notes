import { sendEmailToNewUser } from './user.util';

    var amqp = require('amqplib/callback_api');
    export const sender = (queue,msg) => {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

             channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(`Sent : ${msg}`);
        });

    });
}
export const reciver = (queue) => {
    var amqp = require('amqplib/callback_api');
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

                channel.assertQueue(queue, {
                durable: false
            });
            channel.consume(queue,async function(msg){
                const objectJson=msg.content.toString().toString();
                const objectNormal=JSON.parse(objectJson);
                const email=objectNormal.email;
                const firstname=objectNormal.firstname;
                const lastname=objectNormal.lastname;
                const result=await sendEmailToNewUser(email,firstname,lastname);
                 return result;
            },
             {
                noAck: true
            });
        });
    });
}

reciver('Register');