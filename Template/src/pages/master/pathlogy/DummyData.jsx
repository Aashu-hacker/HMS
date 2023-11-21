const DummyData = [
    {
        id: 1,
        InvestigationName: "CBC",
        department: "Radiology",
        testCode: "CBC_01",
        investigationRange: "IPD",
        testType: "numeric",
        formula: "ipd",
        notes: "here u can write notes",
        parameters: [
            {
                id: 1_1,
                components: "RBC",
                yourValue: "4.5",
                standardRange: "4.5-5.5",
                unit: "10^6/ul"
            },
            {
                id: 2_2,
                components: "WBC",
                yourValue: "4.5",
                standardRange: "4.5-5.5",
                unit: "10^6/ul"
            }
        ]
    },
    {
        id: 2,
        InvestigationName: "RCB",
        department: "Radiology",
        testCode: "CBC_01",
        investigationRange: "IPD",
        testType: "numeric",
        formula: "ipd",
        notes: "here u can write notes",
        parameters: [
            {
                id: 2_1,
                components: "RBC",
                yourValue: "4.5",
                standardRange: "4.5-5.5",
                unit: "10^6/ul"
            }, {
                id: 2_2,
                components: "WBC",
                yourValue: "4.5",
                standardRange: "4.5-5.5",
                unit: "10^6/ul"
            }
        ]

    }
]

export default DummyData;