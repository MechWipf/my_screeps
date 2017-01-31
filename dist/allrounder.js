module.exports={
    "title": "A Behavior Tree",
    "description": "",
    "root": "7a71d7c5-88da-48c6-b000-0b13a4f0ed7d",
    "display": {
        "camera_x": 350,
        "camera_y": 501,
        "camera_z": 0.5,
        "x": 0,
        "y": 0
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
            "name": "FindSources",
            "title": "Find Sources",
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
        "4a8d1dd1-3d2f-4197-815b-3efd6d227970": {
            "id": "4a8d1dd1-3d2f-4197-815b-3efd6d227970",
            "name": "Carry",
            "title": "Carry",
            "description": "",
            "display": {
                "x": 944,
                "y": 192
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
                "target": "target",
                "ticks": 10
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
            "name": "FindCarryTarget",
            "title": "Find Carry Target",
            "description": "",
            "display": {
                "x": 944,
                "y": 0
            },
            "parameters": {},
            "properties": {}
        },
        "d4f7adce-3b7a-4c51-80e7-7a703a59f7c5": {
            "id": "d4f7adce-3b7a-4c51-80e7-7a703a59f7c5",
            "name": "FindUpgradeTarget",
            "title": "Find Upgrade Target",
            "description": "",
            "display": {
                "x": 672,
                "y": 496
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
                "x": 672,
                "y": 640
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
                "x": 784,
                "y": 0
            },
            "parameters": {},
            "properties": {},
            "children": [
                "8bae7832-782d-4362-8dc8-a6239aa59cac",
                "1179ef5e-7447-4c77-8ab7-6a71f2c6e76f",
                "5ab0554b-2771-4168-90dc-65db9f8a41ee",
                "2e475c64-5136-4122-927b-fdfe340df190",
                "4a8d1dd1-3d2f-4197-815b-3efd6d227970",
                "2cfb6237-c5a7-482a-9745-869de496dd04",
                "4a0c7096-0568-4381-8a70-c4bfc903cba9"
            ]
        },
        "1179ef5e-7447-4c77-8ab7-6a71f2c6e76f": {
            "id": "1179ef5e-7447-4c77-8ab7-6a71f2c6e76f",
            "name": "HasTarget",
            "title": "HasTarget",
            "description": "",
            "display": {
                "x": 944,
                "y": 48
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
                "x": 672,
                "y": 544
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
                "x": 512,
                "y": 496
            },
            "parameters": {},
            "properties": {},
            "children": [
                "d4f7adce-3b7a-4c51-80e7-7a703a59f7c5",
                "172f676a-10bb-4fd6-98b0-e89f36dbf6bf",
                "2b93aa4d-ed56-4f1b-8a17-9c3890881ac4",
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
                "ef32ef5a-1c5c-4236-acf9-00246aa900d1",
                "40a37337-ff3f-49e9-8bfd-298945d96705",
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
                "target": "target",
                "ticks": 10
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
                "y": -576
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
                "d8d2b1cf-138a-45f0-af00-8df8007901b8",
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
                "89676037-85f3-47b9-975e-6a6df51b01f6",
                "53b097e6-ac21-47ba-9cf8-a60383e09498",
                "eec469dc-9393-46d2-89da-32f02486dd6d"
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
                "eccf5ed1-75ab-4860-8744-a31faf52ba88",
                "3fb029a8-b3c9-4a51-bfc5-9ed83f339b90",
                "f6925e55-9377-443a-8bf0-0412d94a38d7"
            ]
        },
        "11e07d8a-6af9-4acf-b885-90fdf8dbf987": {
            "id": "11e07d8a-6af9-4acf-b885-90fdf8dbf987",
            "name": "FindResources",
            "title": "Find Resources",
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
                "y": -528
            },
            "parameters": {},
            "properties": {}
        },
        "89676037-85f3-47b9-975e-6a6df51b01f6": {
            "id": "89676037-85f3-47b9-975e-6a6df51b01f6",
            "name": "Priority",
            "title": "Priority",
            "description": "",
            "display": {
                "x": 576,
                "y": -640
            },
            "parameters": {},
            "properties": {},
            "children": [
                "3b127916-ee08-4f73-8b5b-702a47b55e10",
                "9f25e980-05d1-435f-8d87-1a2304c2d834"
            ]
        },
        "9f25e980-05d1-435f-8d87-1a2304c2d834": {
            "id": "9f25e980-05d1-435f-8d87-1a2304c2d834",
            "name": "Unclaim",
            "title": "Unclaim",
            "description": "",
            "display": {
                "x": 880,
                "y": -592
            },
            "parameters": {
                "target": "target"
            },
            "properties": {}
        },
        "d8d2b1cf-138a-45f0-af00-8df8007901b8": {
            "id": "d8d2b1cf-138a-45f0-af00-8df8007901b8",
            "name": "Priority",
            "title": "Priority",
            "description": "",
            "display": {
                "x": 592,
                "y": -208
            },
            "parameters": {},
            "properties": {},
            "children": [
                "860c679d-b502-4f88-88c6-1e76a5fc06a0",
                "a404a808-95b5-43b0-a001-01ec649766c9"
            ]
        },
        "a404a808-95b5-43b0-a001-01ec649766c9": {
            "id": "a404a808-95b5-43b0-a001-01ec649766c9",
            "name": "Unclaim",
            "title": "Unclaim",
            "description": "",
            "display": {
                "x": 896,
                "y": -160
            },
            "parameters": {},
            "properties": {}
        },
        "ef32ef5a-1c5c-4236-acf9-00246aa900d1": {
            "id": "ef32ef5a-1c5c-4236-acf9-00246aa900d1",
            "name": "RepeatUntilFailure",
            "title": "Repeat Until Failure",
            "description": "",
            "display": {
                "x": 608,
                "y": 0
            },
            "parameters": {
                "maxLoop": -1
            },
            "properties": {},
            "child": "f877357a-5c8c-46ac-8e25-09a8e358eec1"
        },
        "eccf5ed1-75ab-4860-8744-a31faf52ba88": {
            "id": "eccf5ed1-75ab-4860-8744-a31faf52ba88",
            "name": "CarriesResource",
            "title": "CarriesResource",
            "description": "",
            "display": {
                "x": 480,
                "y": -912
            },
            "parameters": {
                "resource": "energy"
            },
            "properties": {}
        },
        "860c679d-b502-4f88-88c6-1e76a5fc06a0": {
            "id": "860c679d-b502-4f88-88c6-1e76a5fc06a0",
            "name": "RunTree",
            "title": "Run Move",
            "description": "",
            "display": {
                "x": 896,
                "y": -208
            },
            "parameters": {
                "tree": "move"
            },
            "properties": {}
        },
        "3b127916-ee08-4f73-8b5b-702a47b55e10": {
            "id": "3b127916-ee08-4f73-8b5b-702a47b55e10",
            "name": "RunTree",
            "title": "Run Move",
            "description": "",
            "display": {
                "x": 880,
                "y": -640
            },
            "parameters": {
                "tree": "move"
            },
            "properties": {}
        },
        "ca74fe74-c5c6-4ed0-8687-9f388920e08a": {
            "id": "ca74fe74-c5c6-4ed0-8687-9f388920e08a",
            "name": "RunTree",
            "title": "Run Move",
            "description": "",
            "display": {
                "x": 1216,
                "y": 144
            },
            "parameters": {
                "tree": "move"
            },
            "properties": {}
        },
        "2b93aa4d-ed56-4f1b-8a17-9c3890881ac4": {
            "id": "2b93aa4d-ed56-4f1b-8a17-9c3890881ac4",
            "name": "RunTree",
            "title": "Run Move",
            "description": "",
            "display": {
                "x": 672,
                "y": 592
            },
            "parameters": {
                "tree": "move"
            },
            "properties": {}
        },
        "5ab0554b-2771-4168-90dc-65db9f8a41ee": {
            "id": "5ab0554b-2771-4168-90dc-65db9f8a41ee",
            "name": "Claim",
            "title": "Claim",
            "description": "",
            "display": {
                "x": 944,
                "y": 96
            },
            "parameters": {
                "invert": "true"
            },
            "properties": {}
        },
        "72692f1b-e9c7-45ea-a689-221dc1b5fd68": {
            "id": "72692f1b-e9c7-45ea-a689-221dc1b5fd68",
            "name": "Unclaim",
            "title": "Unclaim",
            "description": "",
            "display": {
                "x": 1216,
                "y": 192
            },
            "parameters": {},
            "properties": {}
        },
        "2e475c64-5136-4122-927b-fdfe340df190": {
            "id": "2e475c64-5136-4122-927b-fdfe340df190",
            "name": "Priority",
            "title": "Priority",
            "description": "",
            "display": {
                "x": 896,
                "y": 144
            },
            "parameters": {},
            "properties": {},
            "children": [
                "ca74fe74-c5c6-4ed0-8687-9f388920e08a",
                "72692f1b-e9c7-45ea-a689-221dc1b5fd68"
            ]
        },
        "4a0c7096-0568-4381-8a70-c4bfc903cba9": {
            "id": "4a0c7096-0568-4381-8a70-c4bfc903cba9",
            "name": "Unclaim",
            "title": "Unclaim",
            "description": "",
            "display": {
                "x": 944,
                "y": 288
            },
            "parameters": {},
            "properties": {}
        },
        "82bcc9a8-b141-4a55-bff9-3df1f28d1fb0": {
            "id": "82bcc9a8-b141-4a55-bff9-3df1f28d1fb0",
            "name": "HasTarget",
            "title": "HasTarget",
            "description": "",
            "display": {
                "x": 944,
                "y": 416
            },
            "parameters": {},
            "properties": {}
        },
        "5d8b99f6-0915-42fd-8056-0c235c335d6b": {
            "id": "5d8b99f6-0915-42fd-8056-0c235c335d6b",
            "name": "MemSequence",
            "title": "MemSequence",
            "description": "",
            "display": {
                "x": 784,
                "y": 368
            },
            "parameters": {},
            "properties": {},
            "children": [
                "e2f162c2-bf77-4660-8979-e57cf3119aaf",
                "82bcc9a8-b141-4a55-bff9-3df1f28d1fb0",
                "867e5681-1ea5-4c21-8f5a-8a6db6f38b8f",
                "a52e50ce-4a13-463a-b74f-a4d8df989f63"
            ]
        },
        "40a37337-ff3f-49e9-8bfd-298945d96705": {
            "id": "40a37337-ff3f-49e9-8bfd-298945d96705",
            "name": "RepeatUntilFailure",
            "title": "Repeat Until Failure",
            "description": "",
            "display": {
                "x": 608,
                "y": 368
            },
            "parameters": {
                "maxLoop": -1
            },
            "properties": {},
            "child": "5d8b99f6-0915-42fd-8056-0c235c335d6b"
        },
        "867e5681-1ea5-4c21-8f5a-8a6db6f38b8f": {
            "id": "867e5681-1ea5-4c21-8f5a-8a6db6f38b8f",
            "name": "RunTree",
            "title": "Run Move",
            "description": "",
            "display": {
                "x": 944,
                "y": 464
            },
            "parameters": {
                "tree": "move"
            },
            "properties": {}
        },
        "e2f162c2-bf77-4660-8979-e57cf3119aaf": {
            "id": "e2f162c2-bf77-4660-8979-e57cf3119aaf",
            "name": "FindConstruction",
            "title": "Find Construction",
            "description": "",
            "display": {
                "x": 944,
                "y": 368
            },
            "parameters": {},
            "properties": {}
        },
        "a52e50ce-4a13-463a-b74f-a4d8df989f63": {
            "id": "a52e50ce-4a13-463a-b74f-a4d8df989f63",
            "name": "BuildConstruction",
            "title": "BuildConstruction",
            "description": "",
            "display": {
                "x": 944,
                "y": 512
            },
            "parameters": {},
            "properties": {}
        },
        "2cfb6237-c5a7-482a-9745-869de496dd04": {
            "id": "2cfb6237-c5a7-482a-9745-869de496dd04",
            "name": "Wait",
            "title": "Wait",
            "description": "",
            "display": {
                "x": 944,
                "y": 240
            },
            "parameters": {
                "time": ""
            },
            "properties": {}
        }
    },
    "custom_nodes": [
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
            "name": "Upgrade",
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
        },
        {
            "name": "RunTree",
            "title": "Run {tree}",
            "category": "action"
        },
        {
            "name": "BuildConstruction",
            "title": "",
            "category": "action"
        },
        {
            "name": "FindUpgradeTarget",
            "title": "Find Upgrade Target",
            "category": "action"
        },
        {
            "name": "FindCarryTarget",
            "title": "Find Carry Target",
            "category": "action"
        },
        {
            "name": "FindConstruction",
            "title": "Find Construction",
            "category": "action"
        },
        {
            "name": "FindResources",
            "title": "Find Resources",
            "category": "action"
        },
        {
            "name": "FindSources",
            "title": "Find Sources",
            "category": "action"
        }
    ]
}