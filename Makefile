renew:
	npx hardhat run --network ecfx_test ./scripts/deployAndConfig.ts
	cd ~/myspace/mywork/0g-storage-node/run && rm -rf db log network
	cd ~/myspace/mywork/0g-storage-kv/run && rm -rf db kv.DB