import req from '../src/common/requestController';

const customElasticSettings: any = async () => {
  const response = await req.PUT('_settings', {
    'index.blocks.read_only_allow_delete': null
  });
  console.log('res', response);
}

customElasticSettings();
