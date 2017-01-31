module.exports={
  "title": "A Behavior Tree",
  "description": "",
  "root": "463eb1b3-3384-4d87-84d3-78a08e3d01ea",
  "display": {
    "camera_x": 579,
    "camera_y": 652,
    "camera_z": 0.75,
    "x": -80,
    "y": -320
  },
  "properties": {},
  "nodes": {
    "04bd105b-d19f-4548-89d7-3e35584b03b6": {
      "id": "04bd105b-d19f-4548-89d7-3e35584b03b6",
      "name": "FindPath",
      "title": "FindPath",
      "description": "",
      "display": {
        "x": 448,
        "y": -320
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
        "x": 448,
        "y": -272
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
        "x": 112,
        "y": -320
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
        "x": 288,
        "y": -320
      },
      "parameters": {},
      "properties": {},
      "children": [
        "04bd105b-d19f-4548-89d7-3e35584b03b6",
        "06f63f43-a3ed-4710-8ebb-2c8077e9ca06"
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
    },
    {
      "name": "CarriesResource",
      "title": "",
      "category": "action"
    }
  ]
}