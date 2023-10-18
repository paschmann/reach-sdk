const { Command } = require("commander");
const { Reach } = require("./reach");
const program = new Command();
Reach.init();

program
	.name("Reach SDK CLI")
	.description("CLI to send notifications easily using the Reach SDK")
	.version("0.0.1");

program.command("list")
	.description("Prints a list of the supported providers")
	.action(() => {
		console.log(Reach.listProviders());
	});

program.command("arguments")
	.description("Display the required and optional arguments for a supported provider")
	.argument("Provider", "")
	.action((str) => {
		console.log("Arguments for: " + str);
		console.log(Reach.parameters(str));
	});

addProvidersAndOptions();

function addProvidersAndOptions() {
// List and add all providers and their options
	var providers = Reach.listProviders();

	providers.forEach(provider => {
		var send = program.command(provider);

		var args = Reach.parameters(provider);

		Object.keys(args["required"]).forEach(function(key) {
			send.requiredOption("--" + key + " <value> ", "Required");
		});

		Object.keys(args["optional"]).forEach(function(key) {
			send.option("--" + key + " <value>", "");
		});

		send.action(() => {
			console.log("Sending " + provider);

			var requiredOpts = {};
			var optionalOpts = {};

			send.options.forEach(option => {
				if (option.mandatory) {
					requiredOpts[option.long.substring(2)] = send.getOptionValue(option.long.substring(2));
				} else {
					optionalOpts[option.long.substring(2)] = send.getOptionValue(option.long.substring(2));
				}
			});

			const notification = {
				name: provider,
				required:requiredOpts,
				optional: optionalOpts
			};

			console.log(Reach.send(notification));
		});
	});
}

program.parse();