const taxInfo = [
  {
    name: 'British Columbia',
    taxBrackets: [
      {
        income:'first $38,898',
        taxRate:'20.06'
      },
      {
        income:'$38,899 - $45,916',
        taxRate:'22.70'
      },
      {
        income:'$45,917 - $77,797',
        taxRate:'28.20'
      },
      {
        income:'$77,798 - $89,320',
        taxRate:'31.00'
      },
      {
        income:'$89,321 - $91,831',
        taxRate:'32.79'
      },
      {
        income:'$91,832 - $108,460',
        taxRate:'38.29'
      },
      {
        income:'$108,461 - $142,353',
        taxRate:'40.70'
      },
      {
        income:'$142,354 - $202,800',
        taxRate:'43.70'
      },
      {
        income:'over $202,800',
        taxRate:'47.70'
      },
    ]
  }
];

export default taxInfo;