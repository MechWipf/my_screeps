export let creepBTree = {
  // Allrounder
  'allrounder': {
    "title": "A Behavior Tree",
    "description": "",
    "root": "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d",
    "display": {
      "camera_x": 396,
      "camera_y": 762,
      "camera_z": 0.75,
      "x": 16,
      "y": -848
    },
    "properties": {},
    "nodes": {
      "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d": {
        "id": "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d",
        "name": "MemSequence",
        "title": "MemSequence",
        "description": "",
        "display": {
          "x": 128,
          "y": -848
        },
        "parameters": {},
        "properties": {},
        "children": [
          "ec725cce-f1bc-47ea-940e-25fe7e247a24",
          "d87d243c-f149-4430-a7e5-435dddac4e7f"
        ]
      },
      "e211c7a6-ec74-4493-8d39-a5f37e5d8918": {
        "id": "e211c7a6-ec74-4493-8d39-a5f37e5d8918",
        "name": "SearchSources",
        "title": "SearchSources",
        "description": "",
        "display": {
          "x": 816,
          "y": -416
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
          "x": 640,
          "y": -320
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
          "x": 1008,
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
          "x": 1008,
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
          "y": -144
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
          "x": 672,
          "y": -208
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
          "x": 848,
          "y": -208
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
          "x": 640,
          "y": 176
        },
        "parameters": {},
        "properties": {}
      },
      "f3b91bd2-3499-47a0-8855-cfbc258f57fe": {
        "id": "f3b91bd2-3499-47a0-8855-cfbc258f57fe",
        "name": "Claim",
        "title": "Claim",
        "description": "",
        "display": {
          "x": 640,
          "y": -272
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
          "x": 640,
          "y": -96
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
          "x": 576,
          "y": -416
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
          "x": 816,
          "y": -368
        },
        "parameters": {
          "time": 5
        },
        "properties": {}
      },
      "8bae7832-782d-4362-8dc8-a6239aa59cac": {
        "id": "8bae7832-782d-4362-8dc8-a6239aa59cac",
        "name": "GetCarryTarget",
        "title": "Get Carry Target",
        "description": "",
        "display": {
          "x": 640,
          "y": 0
        },
        "parameters": {},
        "properties": {}
      },
      "d4f7adce-3b7a-4c51-80e7-7a703a59f7c5": {
        "id": "d4f7adce-3b7a-4c51-80e7-7a703a59f7c5",
        "name": "GetUpgradeTarget",
        "title": "Get Upgrade Target",
        "description": "",
        "display": {
          "x": 640,
          "y": 240
        },
        "parameters": {},
        "properties": {}
      },
      "b087b7c1-e03c-4d84-b8b0-337dae9c8b6b": {
        "id": "b087b7c1-e03c-4d84-b8b0-337dae9c8b6b",
        "name": "Upgrade",
        "title": "Upgrade",
        "description": "",
        "display": {
          "x": 640,
          "y": 416
        },
        "parameters": {},
        "properties": {}
      },
      "f877357a-5c8c-46ac-8e25-09a8e358eec1": {
        "id": "f877357a-5c8c-46ac-8e25-09a8e358eec1",
        "name": "MemSequence",
        "title": "MemSequence",
        "description": "",
        "display": {
          "x": 480,
          "y": 0
        },
        "parameters": {},
        "properties": {},
        "children": [
          "8bae7832-782d-4362-8dc8-a6239aa59cac",
          "1179ef5e-7447-4c77-8ab7-6a71f2c6e76f",
          "85d7db7e-9111-4d3f-857d-1f077c9bc6d9",
          "4a8d1dd1-3d2f-4197-815b-3efd6d227970"
        ]
      },
      "85d7db7e-9111-4d3f-857d-1f077c9bc6d9": {
        "id": "85d7db7e-9111-4d3f-857d-1f077c9bc6d9",
        "name": "RepeatUntilSuccess",
        "title": "Repeat Until Success",
        "description": "",
        "display": {
          "x": 672,
          "y": 112
        },
        "parameters": {
          "maxLoop": -1
        },
        "properties": {},
        "child": "6becd852-7a86-4709-8781-e946840e9474"
      },
      "6becd852-7a86-4709-8781-e946840e9474": {
        "id": "6becd852-7a86-4709-8781-e946840e9474",
        "name": "MemSequence",
        "title": "MemSequence",
        "description": "",
        "display": {
          "x": 848,
          "y": 112
        },
        "parameters": {},
        "properties": {},
        "children": [
          "71c7eb7a-e3be-40bd-839b-9aecfc80dae4",
          "6135fb65-e9e4-4902-98d9-f26e38da68e3"
        ]
      },
      "71c7eb7a-e3be-40bd-839b-9aecfc80dae4": {
        "id": "71c7eb7a-e3be-40bd-839b-9aecfc80dae4",
        "name": "FindPath",
        "title": "FindPath",
        "description": "",
        "display": {
          "x": 1008,
          "y": 64
        },
        "parameters": {},
        "properties": {}
      },
      "6135fb65-e9e4-4902-98d9-f26e38da68e3": {
        "id": "6135fb65-e9e4-4902-98d9-f26e38da68e3",
        "name": "Move",
        "title": "Move",
        "description": "",
        "display": {
          "x": 1008,
          "y": 112
        },
        "parameters": {},
        "properties": {}
      },
      "1179ef5e-7447-4c77-8ab7-6a71f2c6e76f": {
        "id": "1179ef5e-7447-4c77-8ab7-6a71f2c6e76f",
        "name": "HasTarget",
        "title": "HasTarget",
        "description": "",
        "display": {
          "x": 640,
          "y": 48
        },
        "parameters": {},
        "properties": {}
      },
      "6a372c7c-70e4-4b82-af13-65131072a289": {
        "id": "6a372c7c-70e4-4b82-af13-65131072a289",
        "name": "RepeatUntilSuccess",
        "title": "Repeat Until Success",
        "description": "",
        "display": {
          "x": 672,
          "y": 352
        },
        "parameters": {
          "maxLoop": -1
        },
        "properties": {},
        "child": "c4906621-d1d3-4738-bae1-88c7227f702f"
      },
      "c4906621-d1d3-4738-bae1-88c7227f702f": {
        "id": "c4906621-d1d3-4738-bae1-88c7227f702f",
        "name": "MemSequence",
        "title": "MemSequence",
        "description": "",
        "display": {
          "x": 848,
          "y": 352
        },
        "parameters": {},
        "properties": {},
        "children": [
          "16a19228-1814-4b0a-96e7-17ace05fa849",
          "d512c04a-f561-474b-894d-c577f04413de"
        ]
      },
      "16a19228-1814-4b0a-96e7-17ace05fa849": {
        "id": "16a19228-1814-4b0a-96e7-17ace05fa849",
        "name": "FindPath",
        "title": "FindPath",
        "description": "",
        "display": {
          "x": 1008,
          "y": 304
        },
        "parameters": {},
        "properties": {}
      },
      "d512c04a-f561-474b-894d-c577f04413de": {
        "id": "d512c04a-f561-474b-894d-c577f04413de",
        "name": "Move",
        "title": "Move",
        "description": "",
        "display": {
          "x": 1008,
          "y": 352
        },
        "parameters": {},
        "properties": {}
      },
      "172f676a-10bb-4fd6-98b0-e89f36dbf6bf": {
        "id": "172f676a-10bb-4fd6-98b0-e89f36dbf6bf",
        "name": "HasTarget",
        "title": "HasTarget",
        "description": "",
        "display": {
          "x": 640,
          "y": 288
        },
        "parameters": {},
        "properties": {}
      },
      "62d33030-4dc2-45d1-8938-da3baaf0ab7f": {
        "id": "62d33030-4dc2-45d1-8938-da3baaf0ab7f",
        "name": "MemSequence",
        "title": "MemSequence",
        "description": "",
        "display": {
          "x": 480,
          "y": 240
        },
        "parameters": {},
        "properties": {},
        "children": [
          "d4f7adce-3b7a-4c51-80e7-7a703a59f7c5",
          "172f676a-10bb-4fd6-98b0-e89f36dbf6bf",
          "6a372c7c-70e4-4b82-af13-65131072a289",
          "b087b7c1-e03c-4d84-b8b0-337dae9c8b6b"
        ]
      },
      "d87d243c-f149-4430-a7e5-435dddac4e7f": {
        "id": "d87d243c-f149-4430-a7e5-435dddac4e7f",
        "name": "MemPriority",
        "title": "MemPriority",
        "description": "",
        "display": {
          "x": 240,
          "y": 0
        },
        "parameters": {},
        "properties": {},
        "children": [
          "f877357a-5c8c-46ac-8e25-09a8e358eec1",
          "62d33030-4dc2-45d1-8938-da3baaf0ab7f"
        ]
      },
      "552e8bea-37b7-4698-acc7-d78e5d8c8366": {
        "id": "552e8bea-37b7-4698-acc7-d78e5d8c8366",
        "name": "HasTarget",
        "title": "HasTarget",
        "description": "",
        "display": {
          "x": 624,
          "y": -752
        },
        "parameters": {},
        "properties": {}
      },
      "a49acbbd-b33f-4d33-a74d-960b2482f48d": {
        "id": "a49acbbd-b33f-4d33-a74d-960b2482f48d",
        "name": "FindPath",
        "title": "FindPath",
        "description": "",
        "display": {
          "x": 992,
          "y": -640
        },
        "parameters": {},
        "properties": {}
      },
      "a587df6b-1c79-4e06-8d81-63d2b8355a4e": {
        "id": "a587df6b-1c79-4e06-8d81-63d2b8355a4e",
        "name": "Move",
        "title": "Move",
        "description": "",
        "display": {
          "x": 992,
          "y": -592
        },
        "parameters": {},
        "properties": {}
      },
      "c299c71f-02dc-4f13-bc7f-808a00f9d1fa": {
        "id": "c299c71f-02dc-4f13-bc7f-808a00f9d1fa",
        "name": "RepeatUntilSuccess",
        "title": "Repeat Until Success",
        "description": "",
        "display": {
          "x": 656,
          "y": -640
        },
        "parameters": {
          "maxLoop": -1
        },
        "properties": {},
        "child": "8755fbaa-ec35-4a87-8724-a0b57d9ce092"
      },
      "8755fbaa-ec35-4a87-8724-a0b57d9ce092": {
        "id": "8755fbaa-ec35-4a87-8724-a0b57d9ce092",
        "name": "MemSequence",
        "title": "MemSequence",
        "description": "",
        "display": {
          "x": 832,
          "y": -640
        },
        "parameters": {},
        "properties": {},
        "children": [
          "a49acbbd-b33f-4d33-a74d-960b2482f48d",
          "a587df6b-1c79-4e06-8d81-63d2b8355a4e"
        ]
      },
      "e0830063-a070-449f-8dea-bf75107c80c7": {
        "id": "e0830063-a070-449f-8dea-bf75107c80c7",
        "name": "Claim",
        "title": "Claim",
        "description": "",
        "display": {
          "x": 624,
          "y": -704
        },
        "parameters": {
          "target": "target"
        },
        "properties": {}
      },
      "53b097e6-ac21-47ba-9cf8-a60383e09498": {
        "id": "53b097e6-ac21-47ba-9cf8-a60383e09498",
        "name": "Unclaim",
        "title": "Unclaim",
        "description": "",
        "display": {
          "x": 624,
          "y": -528
        },
        "parameters": {
          "target": "target"
        },
        "properties": {}
      },
      "ed719d4e-15d7-4b0e-9130-b5b163e1ebd9": {
        "id": "ed719d4e-15d7-4b0e-9130-b5b163e1ebd9",
        "name": "MemPriority",
        "title": "MemPriority",
        "description": "",
        "display": {
          "x": 560,
          "y": -848
        },
        "parameters": {},
        "properties": {},
        "children": [
          "11e07d8a-6af9-4acf-b885-90fdf8dbf987",
          "7d4d0286-42eb-42ba-8609-ee2662a0900b"
        ]
      },
      "7d4d0286-42eb-42ba-8609-ee2662a0900b": {
        "id": "7d4d0286-42eb-42ba-8609-ee2662a0900b",
        "name": "Wait",
        "title": "Wait",
        "description": "",
        "display": {
          "x": 800,
          "y": -800
        },
        "parameters": {
          "timer": 2
        },
        "properties": {}
      },
      "f6925e55-9377-443a-8bf0-0412d94a38d7": {
        "id": "f6925e55-9377-443a-8bf0-0412d94a38d7",
        "name": "MemSequence",
        "title": "MemSequence",
        "description": "",
        "display": {
          "x": 384,
          "y": -416
        },
        "parameters": {},
        "properties": {},
        "children": [
          "3439fb13-8e68-42f8-8a95-6e6025853de8",
          "097ebed6-e4c7-4742-8b25-cd9960416107",
          "f3b91bd2-3499-47a0-8855-cfbc258f57fe",
          "463eb1b3-3384-4d87-84d3-78a08e3d01ea",
          "49d543e5-9148-4c6a-9196-52414ffb3bdd",
          "ff57bb17-1f99-4dc3-bd34-e747308dab40"
        ]
      },
      "3fb029a8-b3c9-4a51-bfc5-9ed83f339b90": {
        "id": "3fb029a8-b3c9-4a51-bfc5-9ed83f339b90",
        "name": "MemSequence",
        "title": "MemSequence",
        "description": "",
        "display": {
          "x": 416,
          "y": -848
        },
        "parameters": {},
        "properties": {},
        "children": [
          "ed719d4e-15d7-4b0e-9130-b5b163e1ebd9",
          "552e8bea-37b7-4698-acc7-d78e5d8c8366",
          "e0830063-a070-449f-8dea-bf75107c80c7",
          "c299c71f-02dc-4f13-bc7f-808a00f9d1fa",
          "eec469dc-9393-46d2-89da-32f02486dd6d",
          "53b097e6-ac21-47ba-9cf8-a60383e09498"
        ]
      },
      "ec725cce-f1bc-47ea-940e-25fe7e247a24": {
        "id": "ec725cce-f1bc-47ea-940e-25fe7e247a24",
        "name": "MemPriority",
        "title": "MemPriority",
        "description": "",
        "display": {
          "x": 272,
          "y": -848
        },
        "parameters": {},
        "properties": {},
        "children": [
          "3fb029a8-b3c9-4a51-bfc5-9ed83f339b90",
          "f6925e55-9377-443a-8bf0-0412d94a38d7"
        ]
      },
      "11e07d8a-6af9-4acf-b885-90fdf8dbf987": {
        "id": "11e07d8a-6af9-4acf-b885-90fdf8dbf987",
        "name": "GetResources",
        "title": "GetResources",
        "description": "",
        "display": {
          "x": 800,
          "y": -848
        },
        "parameters": {},
        "properties": {}
      },
      "eec469dc-9393-46d2-89da-32f02486dd6d": {
        "id": "eec469dc-9393-46d2-89da-32f02486dd6d",
        "name": "TakeResources",
        "title": "TakeResources",
        "description": "",
        "display": {
          "x": 624,
          "y": -576
        },
        "parameters": {},
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
      },
      {
        "name": "GetCarryTarget",
        "title": "Get Carry Target",
        "category": "action"
      },
      {
        "name": "GetUpgradeTarget",
        "title": "Get Upgrade Target",
        "category": "action"
      },
      {
        "name": "Upgrade",
        "title": "",
        "category": "action"
      },
      {
        "name": "GetResources",
        "title": "",
        "category": "action"
      },
      {
        "name": "TakeResources",
        "title": "",
        "category": "action"
      }
    ]
  },
  // end Allrounder

  // Harvester-Energy
  'harvester-energy': {
    "title": "A Behavior Tree",
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
          "7dd677a2-8de4-44c7-9d6a-59b5b43f3247",
          "c82e59b6-befe-4f8e-9010-4ec9fd2f6966"
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
      },
      "c82e59b6-befe-4f8e-9010-4ec9fd2f6966": {
        "id": "c82e59b6-befe-4f8e-9010-4ec9fd2f6966",
        "name": "Wait",
        "title": "Wait",
        "description": "",
        "display": {
          "x": 640,
          "y": -16
        },
        "parameters": {
          "time": 1
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
      },
      {
        "name": "GetCarryTarget",
        "title": "Get Carry Target",
        "category": "action"
      },
      {
        "name": "GetUpgradeTarget",
        "title": "Get Upgrade Target",
        "category": "action"
      },
      {
        "name": "Upgrade",
        "title": "",
        "category": "action"
      }
    ]
  },
  // end Harvester-Energy

}