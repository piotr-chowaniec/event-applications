const Yup = require('yup');
const { isDate, parse, format } = require('date-fns');

const transformToDate = (value, originalValue) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'yyyy-MM-dd', new Date());

  return parsedDate;
};

const applicationSchema = Yup.object().shape({
  eventDate: Yup.date().required().label('Event Date')
    .transform(transformToDate)
    .min(format(new Date(), 'yyyy-MM-dd'), 'You need to choose future date. Or are you a time traveler?'),
});

module.exports = applicationSchema;
