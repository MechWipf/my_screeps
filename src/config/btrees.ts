export let creepBTree = {
  // Allrounder
  'allrounder': {
    "title": "A Tree for the Allrounder",
    "description": "",
    "root": "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d",
    "display": {
      "camera_x": 502,
      "camera_y": 628,
      "camera_z": 1.25,
      "x": -64,
      "y": -48
    },
    "properties": {},
    "nodes": {
      "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d": {
        "id": "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d",
        "name": "MemSequence",
        "title": "MemSequence",
        "description": "",
        "display": {
          "x": 16,
          "y": -48
        },
        "parameters": {},
        "properties": {},
        "children": [
          "3439fb13-8e68-42f8-8a95-6e6025853de8",
          "097ebed6-e4c7-4742-8b25-cd9960416107",
          "f3b91bd2-3499-47a0-8855-cfbc258f57fe",
          "463eb1b3-3384-4d87-84d3-78a08e3d01ea",
          "49d543e5-9148-4c6a-9196-52414ffb3bdd",
          "ff57bb17-1f99-4dc3-bd34-e747308dab40",
          "574b6a71-81dc-4361-893c-49c9ee118dcb"
        ]
      },
      "e211c7a6-ec74-4493-8d39-a5f37e5d8918": {
        "id": "e211c7a6-ec74-4493-8d39-a5f37e5d8918",
        "name": "SearchSources",
        "title": "SearchSources",
        "description": "",
        "display": {
          "x": 448,
          "y": -368
        },
        "parameters": {},
        "properties": {}
      },
      "097ebed6-e4c7-4742-8b25-cd9960416107": {
        "id": "097ebed6-e4c7-4742-8b25-cd9960416107",
        "name": "HasTarget",
        "title": "HasTarget",
        "description": "",
        "display": {
          "x": 272,
          "y": -272
        },
        "parameters": {},
        "properties": {}
      },
      "04bd105b-d19f-4548-89d7-3e35584b03b6": {
        "id": "04bd105b-d19f-4548-89d7-3e35584b03b6",
        "name": "FindPath",
        "title": "FindPath",
        "description": "",
        "display": {
          "x": 640,
          "y": -208
        },
        "parameters": {},
        "properties": {}
      },
      "06f63f43-a3ed-4710-8ebb-2c8077e9ca06": {
        "id": "06f63f43-a3ed-4710-8ebb-2c8077e9ca06",
        "name": "Move",
        "title": "Move",
        "description": "",
        "display": {
          "x": 640,
          "y": -160
        },
        "parameters": {},
        "properties": {}
      },
      "49d543e5-9148-4c6a-9196-52414ffb3bdd": {
        "id": "49d543e5-9148-4c6a-9196-52414ffb3bdd",
        "name": "Harvest",
        "title": "Harvest",
        "description": "",
        "display": {
          "x": 272,
          "y": -96
        },
        "parameters": {},
        "properties": {}
      },
      "463eb1b3-3384-4d87-84d3-78a08e3d01ea": {
        "id": "463eb1b3-3384-4d87-84d3-78a08e3d01ea",
        "name": "RepeatUntilSuccess",
        "title": "Repeat Until Success",
        "description": "",
        "display": {
          "x": 304,
          "y": -160
        },
        "parameters": {
          "maxLoop": 3
        },
        "properties": {},
        "child": "0cb66983-7d5e-4dd1-8bc3-3ae815f6af5d"
      },
      "0cb66983-7d5e-4dd1-8bc3-3ae815f6af5d": {
        "id": "0cb66983-7d5e-4dd1-8bc3-3ae815f6af5d",
        "name": "MemSequence",
        "title": "MemSequence",
        "description": "",
        "display": {
          "x": 480,
          "y": -160
        },
        "parameters": {},
        "properties": {},
        "children": [
          "04bd105b-d19f-4548-89d7-3e35584b03b6",
          "06f63f43-a3ed-4710-8ebb-2c8077e9ca06"
        ]
      },
      "4a8d1dd1-3d2f-4197-815b-3efd6d227970": {
        "id": "4a8d1dd1-3d2f-4197-815b-3efd6d227970",
        "name": "Carry",
        "title": "Carry",
        "description": "",
        "display": {
          "x": 400,
          "y": 0
        },
        "parameters": {},
        "properties": {}
      },
      "574b6a71-81dc-4361-893c-49c9ee118dcb": {
        "id": "574b6a71-81dc-4361-893c-49c9ee118dcb",
        "name": "MemSequence",
        "title": "MemSequence",
        "description": "",
        "display": {
          "x": 224,
          "y": 0
        },
        "parameters": {},
        "properties": {},
        "children": [
          "4a8d1dd1-3d2f-4197-815b-3efd6d227970"
        ]
      },
      "f3b91bd2-3499-47a0-8855-cfbc258f57fe": {
        "id": "f3b91bd2-3499-47a0-8855-cfbc258f57fe",
        "name": "Claim",
        "title": "Claim",
        "description": "",
        "display": {
          "x": 272,
          "y": -224
        },
        "parameters": {
          "target": "target"
        },
        "properties": {}
      },
      "ff57bb17-1f99-4dc3-bd34-e747308dab40": {
        "id": "ff57bb17-1f99-4dc3-bd34-e747308dab40",
        "name": "Unclaim",
        "title": "Unclaim",
        "description": "",
        "display": {
          "x": 272,
          "y": -48
        },
        "parameters": {
          "target": "target"
        },
        "properties": {}
      },
      "3439fb13-8e68-42f8-8a95-6e6025853de8": {
        "id": "3439fb13-8e68-42f8-8a95-6e6025853de8",
        "name": "MemPriority",
        "title": "MemPriority",
        "description": "",
        "display": {
          "x": 208,
          "y": -320
        },
        "parameters": {},
        "properties": {},
        "children": [
          "e211c7a6-ec74-4493-8d39-a5f37e5d8918",
          "7ead04a1-9f16-4363-80d3-396c61528e9e"
        ]
      },
      "7ead04a1-9f16-4363-80d3-396c61528e9e": {
        "id": "7ead04a1-9f16-4363-80d3-396c61528e9e",
        "name": "Wait",
        "title": "Wait",
        "description": "",
        "display": {
          "x": 448,
          "y": -320
        },
        "parameters": {
          "time": 5
        },
        "properties": {}
      }
    },
    "custom_nodes": [
      {
        "name": "SearchSources",
        "title": "",
        "category": "action"
      },
      {
        "name": "HasTarget",
        "title": "",
        "category": "action"
      },
      {
        "name": "FindPath",
        "title": "",
        "category": "action"
      },
      {
        "name": "Move",
        "title": "",
        "category": "action"
      },
      {
        "name": "Harvest",
        "title": "",
        "category": "action"
      },
      {
        "name": "Carry",
        "title": "",
        "category": "action"
      },
      {
        "name": "Claim",
        "title": "",
        "category": "action"
      },
      {
        "name": "Unclaim",
        "title": "",
        "category": "action"
      },
      {
        "name": "StoreNear",
        "title": "Store",
        "category": "action"
      }
    ]
  },
  // end Allrounder

  // Harvester-Energy
  'harvester-energy': {
    "title": "Tree for the Harvester",
    "description": "",
    "root": "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d",
    "display": {
      "camera_x": 579,
      "camera_y": 652,
      "camera_z": 1.25,
      "x": -64,
      "y": -48
    },
    "properties": {},
    "nodes": {
      "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d": {
        "id": "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d",
        "name": "MemSequence",
        "title": "MemSequence",
        "description": "",
        "display": {
          "x": 16,
          "y": -48
        },
        "parameters": {},
        "properties": {},
        "children": [
          "cd5d1a9c-e71e-4a05-a0e5-2a69b8298b22",
          "097ebed6-e4c7-4742-8b25-cd9960416107",
          "f3b91bd2-3499-47a0-8855-cfbc258f57fe",
          "463eb1b3-3384-4d87-84d3-78a08e3d01ea",
          "ba79a9eb-5b33-4da5-9db1-aded73ea3ee0"
        ]
      },
      "e211c7a6-ec74-4493-8d39-a5f37e5d8918": {
        "id": "e211c7a6-ec74-4493-8d39-a5f37e5d8918",
        "name": "SearchSources",
        "title": "SearchSources",
        "description": "",
        "display": {
          "x": 464,
          "y": -368
        },
        "parameters": {},
        "properties": {}
      },
      "097ebed6-e4c7-4742-8b25-cd9960416107": {
        "id": "097ebed6-e4c7-4742-8b25-cd9960416107",
        "name": "HasTarget",
        "title": "HasTarget",
        "description": "",
        "display": {
          "x": 272,
          "y": -272
        },
        "parameters": {},
        "properties": {}
      },
      "04bd105b-d19f-4548-89d7-3e35584b03b6": {
        "id": "04bd105b-d19f-4548-89d7-3e35584b03b6",
        "name": "FindPath",
        "title": "FindPath",
        "description": "",
        "display": {
          "x": 640,
          "y": -208
        },
        "parameters": {},
        "properties": {}
      },
      "06f63f43-a3ed-4710-8ebb-2c8077e9ca06": {
        "id": "06f63f43-a3ed-4710-8ebb-2c8077e9ca06",
        "name": "Move",
        "title": "Move",
        "description": "",
        "display": {
          "x": 640,
          "y": -160
        },
        "parameters": {},
        "properties": {}
      },
      "49d543e5-9148-4c6a-9196-52414ffb3bdd": {
        "id": "49d543e5-9148-4c6a-9196-52414ffb3bdd",
        "name": "Harvest",
        "title": "Harvest",
        "description": "",
        "display": {
          "x": 640,
          "y": -112
        },
        "parameters": {},
        "properties": {}
      },
      "463eb1b3-3384-4d87-84d3-78a08e3d01ea": {
        "id": "463eb1b3-3384-4d87-84d3-78a08e3d01ea",
        "name": "RepeatUntilSuccess",
        "title": "Repeat Until Success",
        "description": "",
        "display": {
          "x": 304,
          "y": -160
        },
        "parameters": {
          "maxLoop": 3
        },
        "properties": {},
        "child": "0cb66983-7d5e-4dd1-8bc3-3ae815f6af5d"
      },
      "0cb66983-7d5e-4dd1-8bc3-3ae815f6af5d": {
        "id": "0cb66983-7d5e-4dd1-8bc3-3ae815f6af5d",
        "name": "MemSequence",
        "title": "MemSequence",
        "description": "",
        "display": {
          "x": 480,
          "y": -160
        },
        "parameters": {},
        "properties": {},
        "children": [
          "04bd105b-d19f-4548-89d7-3e35584b03b6",
          "06f63f43-a3ed-4710-8ebb-2c8077e9ca06"
        ]
      },
      "f3b91bd2-3499-47a0-8855-cfbc258f57fe": {
        "id": "f3b91bd2-3499-47a0-8855-cfbc258f57fe",
        "name": "Claim",
        "title": "Claim",
        "description": "",
        "display": {
          "x": 272,
          "y": -224
        },
        "parameters": {
          "target": "target"
        },
        "properties": {}
      },
      "ba79a9eb-5b33-4da5-9db1-aded73ea3ee0": {
        "id": "ba79a9eb-5b33-4da5-9db1-aded73ea3ee0",
        "name": "Repeater",
        "title": "Repeater",
        "description": "",
        "display": {
          "x": 256,
          "y": -64
        },
        "parameters": {
          "maxLoop": "1e999"
        },
        "properties": {},
        "child": "e2844393-cf37-42f4-83ee-7b57dd4d9359"
      },
      "7dd677a2-8de4-44c7-9d6a-59b5b43f3247": {
        "id": "7dd677a2-8de4-44c7-9d6a-59b5b43f3247",
        "name": "StoreNear",
        "title": "Store",
        "description": "",
        "display": {
          "x": 640,
          "y": -64
        },
        "parameters": {},
        "properties": {}
      },
      "e2844393-cf37-42f4-83ee-7b57dd4d9359": {
        "id": "e2844393-cf37-42f4-83ee-7b57dd4d9359",
        "name": "MemSequence",
        "title": "MemSequence",
        "description": "",
        "display": {
          "x": 464,
          "y": -64
        },
        "parameters": {},
        "properties": {},
        "children": [
          "49d543e5-9148-4c6a-9196-52414ffb3bdd",
          "7dd677a2-8de4-44c7-9d6a-59b5b43f3247"
        ]
      },
      "de04a0f8-e874-4b27-8451-f2f1ff070283": {
        "id": "de04a0f8-e874-4b27-8451-f2f1ff070283",
        "name": "Wait",
        "title": "Wait",
        "description": "",
        "display": {
          "x": 464,
          "y": -320
        },
        "parameters": {
          "time": 10
        },
        "properties": {}
      },
      "cd5d1a9c-e71e-4a05-a0e5-2a69b8298b22": {
        "id": "cd5d1a9c-e71e-4a05-a0e5-2a69b8298b22",
        "name": "MemPriority",
        "title": "MemPriority",
        "description": "",
        "display": {
          "x": 208,
          "y": -320
        },
        "parameters": {},
        "properties": {},
        "children": [
          "e211c7a6-ec74-4493-8d39-a5f37e5d8918",
          "de04a0f8-e874-4b27-8451-f2f1ff070283"
        ]
      }
    },
    "custom_nodes": [
      {
        "name": "SearchSources",
        "title": "",
        "category": "action"
      },
      {
        "name": "HasTarget",
        "title": "",
        "category": "action"
      },
      {
        "name": "FindPath",
        "title": "",
        "category": "action"
      },
      {
        "name": "Move",
        "title": "",
        "category": "action"
      },
      {
        "name": "Harvest",
        "title": "",
        "category": "action"
      },
      {
        "name": "Carry",
        "title": "",
        "category": "action"
      },
      {
        "name": "Claim",
        "title": "",
        "category": "action"
      },
      {
        "name": "Unclaim",
        "title": "",
        "category": "action"
      },
      {
        "name": "StoreNear",
        "title": "Store",
        "category": "action"
      }
    ]
  },
  // end Harvester-Energy

}