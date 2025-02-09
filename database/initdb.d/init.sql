CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(55) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL
);

CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(55) NOT NULL
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    body VARCHAR(255) NOT NULL
);

CREATE TABLE users_conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    conversation_id INTEGER REFERENCES conversations(id)
);

CREATE TABLE conversations_messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES conversations(id),
    message_id INTEGER REFERENCES messages(id)
);

INSERT INTO users (username, password) VALUES ('Michael', '$argon2id$v=19$m=65536,t=3,p=4$/nnYtTCq42mnybWxvB6/8w$cFGZ2Zwd15P2GoNk1fI0tGgMxirN3w8bod/w3qlJGgk');
INSERT INTO users (username, password) VALUES ('Jie', '$argon2id$v=19$m=65536,t=3,p=4$/nnYtTCq42mnybWxvB6/8w$cFGZ2Zwd15P2GoNk1fI0tGgMxirN3w8bod/w3qlJGgk');

INSERT INTO conversations (name) VALUES ('Chat 1');
INSERT INTO conversations (name) VALUES ('Chat 2');

INSERT INTO users_conversations (user_id, conversation_id) VALUES (1, 1);
INSERT INTO users_conversations (user_id, conversation_id) VALUES (2, 1);
INSERT INTO users_conversations (user_id, conversation_id) VALUES (1, 2);
INSERT INTO users_conversations (user_id, conversation_id) VALUES (2, 2);

INSERT INTO messages (sender_id, body) VALUES (1, 'This is a message');
INSERT INTO messages (sender_id, body) VALUES (2, 'This is a reply');
INSERT INTO messages (sender_id, body) VALUES (1, 'This is a message in a different chat');

INSERT INTO conversations_messages (conversation_id, message_id) VALUES (1, 1);
INSERT INTO conversations_messages (conversation_id, message_id) VALUES (1, 2);
INSERT INTO conversations_messages (conversation_id, message_id) VALUES (2, 3);