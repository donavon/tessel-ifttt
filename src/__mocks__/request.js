export default function request(props, cb) {
  const { uri } = props;
  request.props = props;
  const isBadEvent = /\/trigger\/BADEVENT\/with\//.test(uri);
  process.nextTick(
    () => isBadEvent ? cb('ERROR') : cb(null, 'SUCCESS')
  );
}
