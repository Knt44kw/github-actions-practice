import os
import boto3
import mimetypes
from botocore.config import Config


def run():
    # INPUT_<action.yamlで指定したkey名> で custom action上で定義した入力引数を取得できる
    bucket = os.environ['INPUT_BUCKET']
    region = os.environ['INPUT_REGION']
    dist_folder = os.environ['INPUT_DIST-FOLDER']

    configuration = Config(region_name=region)

    s3_client = boto3.client('s3', config=configuration)

    for root, subdirs, files in os.walk(dist_folder):
        for file in files:
            s3_client.upload_file(
                os.path.join(root, file),
                bucket,
                os.path.join(root, file).replace(dist_folder + '/', ''),
                ExtraArgs={"ContentType": mimetypes.guess_type(file)[0]}
            )

    website_url = f'http://{bucket}.s3-website-{region}.amazonaws.com'
    # The below code sets the 'website-url' output (the old ::set-output syntax isn't supported anymore - that's the only thing that changed though)
    with open(os.environ['GITHUB_OUTPUT'], 'a') as gh_output:
        print(f'website-url={website_url}', file=gh_output)


if __name__ == '__main__':
    run()
